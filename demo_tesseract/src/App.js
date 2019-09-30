import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { OcrLineResponseModel } from './OcrLineResponseModel';

//import Tesseract from 'tesseract.js';// Tesseract v1, npm install tesseract.js

// Tesseract v2, npm install tesseract.js@next
import Tesseract from 'tesseract.js';

const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

//var scanner = window.scannerjs;

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

  handleChangeFreeOcrApi = (event) => {
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        //console.log('FILE: ', upload);
        uploads.push(upload); // This insert as File
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

  handleChangeTesseract = (event) => {
    //event.preventDefault();
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        //console.log('FILE UPLOADED: ', document.getElementById("fileUploader").value);
        //console.log('FILE UPLOADED: ', document.getElementById("fileUploader").);

        //console.log('FILE UPLOADED 1: ', upload);
        //uploads.push(URL.createObjectURL(upload)); // This insert as Blob        
        uploads.push(upload); //This insert as File

        console.log('FILE UPLOADED 2: ', uploads[0]);
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
  generateTesseractTextFromImage = (event) => {
    event.preventDefault();
    let uploads = this.state.uploads
    for (var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(uploads[0], { lang: 'spa' }).progress(progress => {
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

  /* WITH TESSERACT */
  generateTesseractTextFromPdf = (event) => {
    event.preventDefault();
    let uploads = this.state.uploads

    var PDFImage = require("pdf-image").PDFImage;
    //console.log('PDFIMAGE: ', PDFImage);

    /*var path = (window.URL || window.webkitURL).createObjectURL(uploads[0]);
    console.log('PATH: ', path);*/

    var pdfImage = new PDFImage(`C:\\Users\\ivan\\Desktop\\${uploads[0].name}`);
    console.log('PDFIMAGE 2: ', pdfImage);

    pdfImage.numberOfPages().then(value => {
      console.log('NUMBER OF PAGES: ', value);
    });

    pdfImage.convertFile().then((imagePaths) => {
      // [ /tmp/slide-0.png, /tmp/slide-1.png ]
      console.log('IMAGE PATH: ', imagePaths);

      /*let options = {
        'tessjs_create_pdf': '1',
        'tessjs_pdf_auto_download': true, // disable auto download
        'tessjs_pdf_bin': false,            // add pdf file bin array in result
      };
      worker.recognize(uploads[0], 'spa', options).progress((p) => {
        console.log('progress', p);
      }).then(({ files: { pdf } }) => {
        console.log(Object.values(pdf)); // As pdf is an array-like object, you need to do a little convertion first.
        worker.terminate();
      });*/

    }).catch(error => {
      console.log('ERROR: ', error);
    });
  }

  generateTesseractTextFromPdf2 = (event) => {
    event.preventDefault();
    let uploads = this.state.uploads

    this.getBase64(uploads[0]).then((base64Pdf) => {
      console.log('BASE 64 PDF: ', base64Pdf);
      var image = new Image();
      let substr = base64Pdf.substr(28, base64Pdf.length);
      //console.log('SUBSTR: ', substr);

      image.src = 'data:image/png;base64,' + substr;
      console.log('SRC IMAGE: ', image.src);
      document.body.appendChild(image);

      worker.recognize(image.src, 'spa').progress((p) => {
        console.log('progress', p);
      }).then(({ text }) => {
        console.log(text);
        worker.terminate();
      });

    });
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

      let responseLines = [];

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

    let responseLines = [];

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
            <input type="file" id="fileUploader" onChange={this.handleChangeTesseract} />
          </label>

          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} alt="imagealt" width="100px" />
            })}
          </div>

          <button className="button" onClick={this.generateTesseractTextFromPdf}>Generate</button>
        </section>

        { /* Results */}
        <section className="results">
          {this.state.documents.map((value, index) => {
            return (
              <div key={index} className="results__result">
                <div className="results__result__image">
                  <img src={this.state.uploads[index]} alt="imagealt" width="250px" />
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
      </div>
    )
  }

}

export default App;
