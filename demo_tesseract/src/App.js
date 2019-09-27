import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

//var Tesseract = window.Tesseract;
import { TesseractWorker } from 'tesseract.js';
import { OcrLineResponseModel } from './OcrLineResponseModel';
//import scanner from 'scanner-js';
//import * as scanner from 'scanner-js';
var scanner = window.scannerjs;
const worker = new TesseractWorker();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: [],
      patterns: [],
      documents: []
    };
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        //console.log('FILE: ', upload);
        uploads.push(upload);
        //uploads.push(URL.createObjectURL(upload));For Tesseract
      }
      this.setState({
        uploads: uploads
      });
    } else {
      this.setState({
        uploads: []
      })
    }
  }

  /* WITH TESSERACT */
  generateTesseractText = () => {
    let uploads = this.state.uploads
    for (var i = 0; i < uploads.length; i++) {
      worker.recognize(uploads[i], { lang: 'spa' }).progress(progress => {
        console.log('progress', progress);
      }).then(result => {
        console.log('RESULT: ', result);
        // Get Confidence score
        let confidence = result.confidence

        // Get full output
        let text = result.text

        // Get codes
        let pattern = /\b\w{10,10}\b/g;
        let patterns = result.text.match(pattern);

        // Update state
        this.setState({
          patterns: this.state.patterns.concat(patterns),
          documents: this.state.documents.concat({
            pattern: patterns,
            text: text,
            confidence: confidence
          })
        });
        console.log('DOCUMENTS: ', this.state.documents);
      }).catch(err => {
        console.error(err);
      });
    }
  }

  /* WITH Free OCR API and Base64Image */
  generatetextFromBase64Image = () => {
    let uploads = this.state.uploads
    //console.log('UPLOADS: ', uploads[0]);
    this.getBase64(uploads[0]).then((base64Image) => {

      let body = new FormData();
      body.set('apikey', '16e218e05b88957');
      body.set('language', 'spa');
      body.set('isOverlayRequired', false);
      body.set('base64Image', base64Image); // || body.set('file', file) || body.set('url', urlFile);
      body.set('isTable', true);
      body.set('isCreateSearchablePdf', false);
      // body.set('filetype', false); // PNG, JPG, GIF, PDF
      //body.set('OCREngine', 2);

      let responseLines = new Array();

      axios.post('https://api.ocr.space/parse/image', body).then(res => {
        const lines = res.data.ParsedResults[0].TextOverlay.Lines;
        //console.log('RESPONSE LINES: ', res.data.ParsedResults[0].TextOverlay.Lines);
        lines.forEach((line) => {
          let ocrResponseModel = new OcrLineResponseModel();

          //console.log('LINE: ', line);
          ocrResponseModel.lineText = line.LineText;
          line.Words.forEach((word) => {
            ocrResponseModel.words.push(word);
          });
          responseLines.push(ocrResponseModel);
        });
        console.log('OBTAINED BILL: ', responseLines);
      });
    });
  }

  /* WITH Free OCR API and File */
  generatetextFromFile = () => {
    let uploads = this.state.uploads
    console.log('UPLOADS: ', uploads[0]);

    let body = new FormData();
    body.set('apikey', '16e218e05b88957');
    body.set('language', 'spa');
    body.set('isOverlayRequired', false);
    //body.set('base64Image', base64Image); // || body.set('file', file) || body.set('url', urlFile);
    body.set('file', uploads[0]);
    body.set('isTable', true);//Si es pdf tiene que estar a true o no devuelve nada
    body.set('isCreateSearchablePdf', false);
    body.set('scale', true);
    // body.set('filetype', false); // PNG, JPG, GIF, PDF

    let responseLines = new Array();

    axios.post('https://api.ocr.space/parse/image', body).then(res => {
      const lines = res.data.ParsedResults[0].TextOverlay.Lines;
      //console.log('RESPONSE LINES: ', res.data.ParsedResults[0].TextOverlay.Lines);
      lines.forEach((line) => {
        let ocrResponseModel = new OcrLineResponseModel();

        //console.log('LINE: ', line);
        ocrResponseModel.lineText = line.LineText;
        line.Words.forEach((word) => {
          ocrResponseModel.words.push(word);
        });
        responseLines.push(ocrResponseModel);
      });
      console.log('OBTAINED BILL: ', responseLines);
    });
  }

  scanToWebPageAndUpload() {
    var scanRequest = {
      "use_asprise_dialog": true, // Whether to use Asprise Scanning Dialog
      "show_scanner_ui": false, // Whether scanner UI should be shown
      "twain_cap_setting": { // Optional scanning settings
        "ICAP_PIXELTYPE": "TWPT_RGB" // Color
      },
      "output_settings": [{
        "type": "return-base64",
        "format": "jpg"
      }]
    };

    var scanRequest2 = {
      "twain_cap_setting": {
        "ICAP_PIXELTYPE": "TWPT_RGB", // Color
        "ICAP_SUPPORTEDSIZES": "TWSS_USLETTER" // Paper size: TWSS_USLETTER, TWSS_A4, ...
      },
      "output_settings": [
        { "type": "return-base64", "format": "jpg" }, // return images to web page
        {
          "type": "upload", "format": "pdf", // upload as PDF
          "upload_target": {
            "url": "https://asprise.com/scan/applet/upload.php?action=dump"
          }
        }
      ]
    };

    scanner.scan(function displayImagesOnPage(successful, mesg, response) {
      if (!successful) { // On error
        console.error('Failed: ' + mesg);
        return;
      }

      if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User canceled.
        console.info('User canceled');
        return;
      }

      var scannedImages = scanner.getScannedImage(response, true, false); // returns an array of ScannedImage
      for (var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
        var scannedImage = scannedImages[i];
        processScannedImage(scannedImage);
      }
    }, scanRequest);

    /** Processes the scan result */
    /* function displayImagesOnPage(successful, mesg, response) {
      if (!successful) { // On error
        console.error('Failed: ' + mesg);
        return;
      }

      if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User canceled.
        console.info('User canceled');
        return;
      }

      var scannedImages = scanner.getScannedImage(response, true, false); // returns an array of ScannedImage
      for (var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
        var scannedImage = scannedImages[i];
        processScannedImage(scannedImage);
      }
    } */

    /** Processes a ScannedImage */
    function processScannedImage(scannedImage) {
      let imagesScanned = [];
      imagesScanned.push(scannedImage);
      let img = document.createElement('img');
      img.name = 'img';
      img.src = scannedImage.src;
      document.getElementById('body').appendChild(img);
      //down.innerHTML = "Image Element Added.";

      /*var elementImg = createDomElementFromModel({
        'name': 'img',
        'attributes': {
          'class': 'scanned',
          'src': scannedImage.src
        }
      });
      document.getElementById('images').appendChild(elementImg);*/
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>My OCR App</h1>
        </header>

        { /* File uploader */}
        <section className="hero">
          <label className="fileUploaderContainer">
            Click here to upload documents
            <input type="file" id="fileUploader" onChange={this.handleChange} />
          </label>

          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} width="100px" />
            })}
          </div>

          <button className="button" onClick={this.generatetextFromBase64Image}>Generate</button>
        </section>

        { /* Results */}
        <section className="results">
          {this.state.documents.map((value, index) => {
            return (
              <div key={index} className="results__result">
                <div className="results__result__image">
                  <img src={this.state.uploads[index]} width="250px" />
                </div>
                <div className="results__result__info">
                  <div className="results__result__info__codes">
                    <small><strong>Confidence Score:</strong> {value.confidence}</small>
                  </div>
                  <div className="results__result__info__codes">
                    <small><strong>Pattern Output:</strong> {value.pattern.map((pattern) => { return pattern + ', ' })}</small>
                  </div>
                  <div className="results__result__info__text">
                    <small><strong>Full Output:</strong> {value.text}</small>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
        <div onClick={this.scanToWebPageAndUpload}>Scan image</div>
        <div id="images"></div>
      </div>
    )
  }

}

export default App;
