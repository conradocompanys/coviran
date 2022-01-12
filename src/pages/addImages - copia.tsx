import React from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import {useDropzone} from 'react-dropzone';
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_ADDIMAGE } from "../utils/constants";

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    MainBar: {
      width: "100%",
    },
    dragStyle: {
      width: "80%",
      height: "200px",
      margin: "20px",
      backgroundColor: "lightgray",
    },
    customImageContainer: {
      display: "flex",
      "flex-direction": "row",
      width: "100%",
      alignItems: "center",
      "justify-content": "center",
      padding: "20px",
      "box-sizing": "border-box",
    },
    DropzoneBody: {
      "min-height": "20px",
    },
    area: {
      marginTop: "20px",
      padding: "15px",
      border: "2px solid #2484ff",
      borderRadius: "15px",
      textAlign: "center",
      fontSize: "15px",
      color: "#2484ff",
      '&:hover': {
        backgroundColor: "#e2e2e2",
        filter: "grayscale(100%)",
        cursor: "pointer",
        transition: "0.5s"
     }
    },
    dropZone: {
      background: "lightgray",
      border: "2px dashed #bbb",
      "-webkit-border-radius": "5px",
      "border-radius": "5px",
      padding: "50px",
      "text-align": "center",
      font: "21pt bold arial",
      color: "#bbb",
    },
    customSpan: {
      fontSize: "15px",
      marginTop: "10px"
    },
    customImageItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "25%",
      float: "left",
      padding: "20px",
      minWidth: 160,
      maxWidth: 210,
    },
    customImage: {
      display: "block",
      margin: "0 auto",
      maxWidth: "100%",
      width: "100%",
      minWidth: "100px",
      height: "150px"
    },
    hr: {
      marginTop: "40px",
      border: "1px solid #e4e4e4"
    },
    button: {
      marginTop: "10px !important",
      backgroundColor: "#2484ff !important",
      borderRadius: "6px !important",
      color: "white !important",
      letterSpacing: "1px !important",
      padding: "7px 20px !important",
      '&:hover': {
        backgroundColor: "#e2e2e2",
        opacity: "0.6",
        transition: "0.5s"
     }
    },
    deleteIcon: {
      position: "relative",
      top: "35px",
      left: "50px",
      fontSize: "30px",
      color: "#da0d0d",
      cursor: "pointer",
      '&:hover': {
        backgroundColor: "#e2e2e2",
        opacity: "0.6",
        transition: "0.5s"
     }
    },
    ["@media (max-width:1500px)"]: {
      customImageItem: {
        width: "33%",
      },
    },
    ["@media (max-width:1100px)"]: {
      customImageItem: {
        width: "50%",
      },
    },
    ["@media (max-width:875px)"]: {
      customImageItem: {
        width: "100%",
        "max-width": "100%",
      },
    },
  })
);
interface filesDef {
  name: string;
  path: string;
  dataurl: string;
  size: number;
}

const defFilesDef: filesDef[] = [
  {
    name: "",
    path: "",
    dataurl: "",
    size: 0,
  },
];

let valueDef: number = 0;

const Catalogo: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const [files, setFile] = React.useState(defFilesDef);
  const [value, setValue] = React.useState(valueDef);
  let formData = new FormData();
  const instance = axios.create({
    baseURL: "/api/",
    timeout: 15000,
    withCredentials: true,
  });

  const {
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const ForceUpdate = () => {
    return () => setValue(value + 1); // update the state to force render
  }

  const dataURItoBlob = (dataURI: any) => {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab]);
    return bb;
  };

  const updateFiles = (incommingFiles: any) => {
    incommingFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = (e: any) => {
        console.log(e);
        console.log(".----------");
        console.log(file);
        const fileDef: filesDef = {
          name: file.name,
          path: file.path,
          dataurl: e.target.result,
          size: file.size,
        };
        const newFiles = Object.assign(files);
        newFiles.push(fileDef);
        setFile(newFiles);
        ForceUpdate();
      };
      reader.readAsDataURL(file);
    });
  };
  const uploadFiles = () => {
    if (files.length > 0) {
      Promise.all(
        files.map((file) => {
          console.log("AAAAAA");
          try {
            if (file.name !== "") {
              formData.append(
                file.name,
                dataURItoBlob(file.dataurl),
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
            setFile(defFilesDef);
            formData = new FormData();
            console.log(res);
          })
          .catch((e) => {
            console.log("error al publicar los ficheros" + e);
          });
      });
    }
  };
  const thumbsPreview = (itemFiles: filesDef[]) =>
  itemFiles.map((file) =>
    file.name === "" ? (
      <></>
    ) : (
      <>
        <div className={classes.customImageItem} key={file.name}>
          <DeleteIcon className={classes.deleteIcon} onClick={() => deleteOneFile(file)}/>
          <img src={file.dataurl} className={classes.customImage} alt="" />
          <span className={classes.customSpan}>{file.name}</span>
        </div>
      </>
    )
  );

  const deleteOneFile = (file) => {
    if (files != null && file != null) {
      var newFiles = files;
      var indexToDelete = files.findIndex(x => x.name == file.name);
      if (indexToDelete > -1) {
        newFiles.splice(indexToDelete, 1);
      }
      setFile(newFiles);
      formData = new FormData();
      ForceUpdate();
    }
  };

  const deleteFiles = () => {
    setFile([{
      name: "",
      path: "",
      dataurl: "",
      size: 0,
    }]);
    formData = new FormData();
  };
  React.useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.dataurl));
    },
    [files]
  );

  return (
    <>
      <Helmet>
        <title>
          {} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_ADDIMAGE} />
        <div className="MainBar"></div>
        {/* <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" color="inherit">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Button color="inherit" onClick={uploadFiles}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Publicar
                </Typography>
              </Button>
              <Button color="inherit" onClick={deleteFiles}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Borrar Ficheros
                </Typography>
              </Button>
            </Toolbar>
          </AppBar>
        </Box> */}

        <Button disabled={files == null || files.length < 2} className={ classes.button } color="inherit" onClick={uploadFiles}>
            Publicar
        </Button>

        <div className={classes.DropzoneBody}>
         <Dropzone onDrop={(acceptedFiles) => updateFiles(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className={classes.area} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Pulse aqui o arrastre ficheros o carpetas</p>
                </div>
                <hr className={classes.hr}></hr>
                {/* <h4>Vista Previa</h4> */}
                <aside className={classes.customImageContainer}>
                  {thumbsPreview(files)}
                </aside>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </>
  );
};

export default Catalogo;
