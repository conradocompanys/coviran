import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Dropzone from "react-dropzone";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import '../css/addImages.css';
import uploadIcon from '../images/upload-file.png';

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_ADDIMAGE } from "../utils/constants";

const instance = axios.create({
  baseURL: "https://media.coviran.es/api",
  timeout: 15000,
  withCredentials: true,
});
let formData = new FormData();

var state = {
  files: []
}
export default class Catalogo extends Component<state>  {
  constructor(props: any) {
      super(props);
      this.state = {
        files: []
      }
  }

  componentDidMount() {
    
  }

  dataURItoBlob = (dataURI: any) => {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab]);
    return bb;
  };

  updateFiles = (incommingFiles: any) => {
    var { files } = this.state;
    incommingFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = (e) => {
        console.log(e);
        console.log(".----------");
        console.log(file);
        var fileDef = {
          name: file.name,
          path: file.path,
          dataurl: e.target.result,
          size: file.size,
        };
        const newFiles = Object.assign(files);
        newFiles.push(fileDef);
        this.setState({ files: newFiles });
      };
      reader.readAsDataURL(file);
    });
  };
  
  uploadFiles = () => {
    var files = this.state.files;
    if (files.length > 0) {
      Promise.all(
        files.map((file: any) => {
          console.log("AAAAAA");
          try {
            if (file.name !== "") {
              formData.append(
                file.name,
                this.dataURItoBlob(file.dataurl),
                file.path
              );
              console.log(formData);
            }
          } catch (e) {
            console.log(e);
          }
        })
      ).then(() => {
        console.log(formData);
        instance
          .post("/images", formData, {
            headers: {
              "Content-Type": "multipart/form-data",            
            },
          })
          .then((res) => {
            this.setState({ files: [{ name: "", path: "", dataurl: "", size: 0 }] });
            formData = new FormData();
            console.log(res);
          })
          .catch((e) => {
            console.log("error al publicar los ficheros" + e);
          });
      });
    }
  };

  deleteOneFile = (file: any) => {
    var files = this.state.files;
    if (files != null && file != null) {
      var newFiles = files;
      var indexToDelete = files.findIndex(x => x.name == file.name);
      if (indexToDelete > -1) {
        newFiles.splice(indexToDelete, 1);
      }
      this.setState({ files: newFiles });
      formData = new FormData();
    }
  };

  deleteFiles = () => {
    this.setState({ files: [{ name: "", path: "", dataurl: "", size: 0 }] });
  };

  render() {
    var { files } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Helmet>
          <title>
            {} | {APP_TITLE}
          </title>
        </Helmet>
        <div className="root">
          <PageTitle title={PAGE_TITLE_ADDIMAGE} />
          <div className="MainBar"></div>
          
          <Button className="button" disabled={files == null || files.length < 2} color="inherit" onClick={() => this.uploadFiles()}>
              Publicar
          </Button>
  
          <div className="DropzoneBody">
           <Dropzone accept="image/*" onDrop={(acceptedFiles) => this.updateFiles(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div className="area" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={uploadIcon} className="uploadIcon" alt="" />
                    <div>
                      <p className="titleDrag">Drag & Drop</p>
                      <p className="subtitleDrag">Tus imágenes o haz click aquí</p>
                      <p className="requirementsDrag">Solo JPEG, PNG y GIF</p>
                    </div>
                  </div>
                  <hr className="hr"></hr>
                  {/* <h4>Vista Previa</h4> */}
                  <aside className="customImageContainer">
                    { files.map((file: any) => 
                        <>
                          <div className="customImageItem" key={file.name}>
                            <DeleteIcon className="deleteIcon" onClick={() => this.deleteOneFile(file)}/>
                            <img src={file.dataurl} className="customImage" alt="" />
                            <span className="customSpan">{file.name}</span>
                          </div>
                        </>
                    )}
                  </aside>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </>
    );
  }
}

// Catalogo.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// const withStylesCatalogo = withStyles(styles)(Catalogo);
// export default withStylesCatalogo as Catalogo;