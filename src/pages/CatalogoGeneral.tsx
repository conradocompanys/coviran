import React, { Component } from "react";
import { Helmet } from "react-helmet";
const Gallery = require("react-grid-gallery");
//import axios, { AxiosResponse } from "axios";

import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// components
import PageTitle from "../components/PageTitle";

import "../css/catalogGeneral.css";

// constants
import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";
import { catalogoService } from "../services/catalogo.service";
import ReactLoading from "react-loading";

var state = {
  
}
export default class Home extends Component<state>  {
  constructor(props: any) {
    super(props);
    this.state = {
      imagesMock: [{
        bucketurl: "https://www.idgastronomic.com/wp-content/uploads/2021/09/la-verdadera-comida-americana.jpg",
        bucketdatemodified: "2021-12-04 18:18:28.985000",
        createddate: "2021-11-15 11:10:12.163000+00:00",
        key_producto: 36116,
        mdm_descnormacarteleria: "BOLLYCAO cacao 60 g pack 3 u.",
        mdm_descnormacomercial: "BOLLO RELLENO CACAO BOLLYCAO 60 g P-3 u.",
      },
      {
        bucketurl: "https://www.cuerpomente.com/medio/2019/07/03/fast-food-vegano_eb9151e0_900x900.jpg",
        bucketdatemodified: "2021-12-18 18:18:28.985000",
        createddate: "2021-11-14 11:10:12.163000+00:00",
        key_producto: 36115,
        mdm_descnormacarteleria: "Magdalena redonda LA BELLA EASO, 18 uds., paquete 522 g",
        mdm_descnormacomercial: "Magdalena redonda LA BELLA EASO, 18 uds., P 522 g",
      },
      {
        bucketurl: "https://www.animalmax.es/wp-content/uploads/2020/03/Raw-food-page.jpg",
        bucketdatemodified: "2021-12-16 18:18:28.985000",
        createddate: "2021-11-13 11:10:12.163000+00:00",
        key_producto: 36114,
        mdm_descnormacarteleria: "Donuts glacé DONUTS, paquete 4 uds",
        mdm_descnormacomercial: "Donuts glacé DONUTS, P-4 uds",
      },
      {
        bucketurl: "https://www.baf.com/wp-content/uploads/2018/03/corp_innovations-1.jpg",
        bucketdatemodified: "2021-12-12 18:18:28.985000",
        createddate: "2021-11-12 11:10:12.163000+00:00",
        key_producto: 36113,
        mdm_descnormacarteleria: "Donettes clásicos DONETTES, 8+1 uds, paquete 171 g",
        mdm_descnormacomercial: "Donettes clásicos DONETTES, 8+1 uds, P 171 g",
      },
      // {
      //   bucketurl: "https://www.dondeir.com/wp-content/uploads/2021/08/hozka-gourmet-carnes-frias.jpg",
      //   bucketdatemodified: "2021-12-27 18:18:28.985000",
      //   createddate: "2021-11-11 11:10:12.163000+00:00",
      //   key_producto: 36112,
      //   mdm_descnormacarteleria: "Mini magdalenas pepitas de chocolate RUSTIK BAKERY, bolsa 206 g",
      //   mdm_descnormacomercial: "Mini magdalenas pepitas de chocolate RUSTIK BAKERY, B 206 g",
      // },
      {
        bucketurl: "https://fotos.perfil.com/2020/09/08/trim/900/900/slow-food-1013486.jpg",
        bucketdatemodified: "2021-12-20 18:18:28.985000",
        createddate: "2021-11-10 11:10:12.163000+00:00",
        key_producto: 36111,
        mdm_descnormacarteleria: "Pastelito Pantera Rosa BIMBO, 3 uds., paquete 165 g",
        mdm_descnormacomercial: "Pastelito Pantera Rosa BIMBO, 3 uds., P 165 g",
      },
      {
        bucketurl: "https://d3d7qmccklvqbw.cloudfront.net/wp-content/uploads/2019/03/53483045_2027829527265815_1446736905906421760_o-900x900.jpg",
        bucketdatemodified: "2021-12-22 18:18:28.985000",
        createddate: "2021-11-09 11:10:12.163000+00:00",
        key_producto: 36110,
        mdm_descnormacarteleria: "Tigretón BIMBO, 3 unid., paquete 150 g",
        mdm_descnormacomercial: "Tigretón BIMBO, 3 unid., P 150 g",
      },
      {
        bucketurl: "https://s3-eu-west-1.amazonaws.com/brussels-images/content/gallery/visit/article/street-food/intro-streetfood-my-tannour-resized.jpg",
        bucketdatemodified: "2021-12-10 18:18:28.985000",
        createddate: "2021-11-08 11:10:12.163000+00:00",
        key_producto: 36109,
        mdm_descnormacarteleria: "Ñams WEIKIS, 4 uds, caja 180 g",
        mdm_descnormacomercial: "Ñams WEIKIS, 4 uds, C 180 g",
      }],
      images: [],
      modalDetalle: false,
      detalleProducto: {},
      modalLoad: false,
      modalError: false,
      modalErrorText: "",
      errorsForm: {}
    }
    this.routeChange = this.routeChange.bind(this);
  }

  componentDidMount () {
    this.setState({ modalLoad: true });
    catalogoService.getDataImages({})
    .then((response) => {
      return response.json();
    }).then((response) => {
      if (response != null && response.length > 0) {
        //Harcodear imagen
        for (var i = 0; i < response.length; i++) {
          // if (response[i].img_src == null || response[i].img_src == "") {
            var numRandom = parseInt(Math.random() * ((this.state.imagesMock.length-1) - 0) + 0);
            response[i].img_src = this.state.imagesMock[numRandom].bucketurl;
          // }
        }
        this.setState({ images: response, modalLoad: false });
      }
    })
    .catch(error => {
      this.setState({ modalLoad: false, modalError: true, modalErrorText: "Ha ocurrido un error al mostrar el catálogo." });
    });


    // catalogoService.getDataImages({})
    // .then((response) => {
    //   return response.json();
    // }).then((response) => {
    //   if (response != null && response.length > 0) {
        
    //   }
    // })
    // .catch(error => {
    // });
  }

  routeChange () {
    let path = `/addImage`;
    this.props.history.push(path)
  };

  filtrar = () => {
    
  };

  abrirDetalle (producto) {
    this.setState({ modalLoad: true });
    var img_src = producto.img_src;
    catalogoService.getData({"key_producto" : producto.key_producto})
    .then((response) => {
      return response.json();
    }).then((response) => {
      if (response != null && response.length > 0 && response[0] != null) {
        response[0].img_src = img_src;
        this.setState({ modalLoad: false, modalDetalle: true, detalleProducto: response[0] });
      }
    })
    .catch(error => {
      this.setState({ modalLoad: false, modalError: true, modalErrorText: "Ha ocurrido un error al mostrar el detalle del producto." });
    });
  }

  changeFormDetalle (e, name) {
    var detalleProducto = this.state.detalleProducto;

    if (name == "isimagepublic" || name == "isimageinerror") {
      detalleProducto[name] = e.target.checked;
    } else {
      detalleProducto[name] = e.target.value;
    }

    this.setState({ detalleProducto });
  }

  guardarDetalle () {
    var { detalleProducto, errorsForm } = this.state;
    var listRequired = ["key_producto", "codigo_cooperativa", "aecoc", "mdm_descnormacarteleria", "mdm_descnormacomercial"];
    var error = false;

    //Comprobamos si están rellenos todos los campos, si no, se muestra error
    for (var i = 0; i < listRequired.length; i++) {
      if (detalleProducto[listRequired[i]] == "" || detalleProducto[listRequired[i]] == null) {
        error = true;
        errorsForm[listRequired[i]] = true;
      } else {
        errorsForm[listRequired[i]] = false;
      }
    }

    if (error == false) {
      this.setState({ modalLoad: true });
      catalogoService.updateData(detalleProducto)
      .then((response) => {
        return response.json();
      }).then((response) => {
        if (response != null && response.length > 0 && response[0] != null) {

        }
      })
      .catch(error => {
        this.setState({ modalLoad: false, modalError: true, modalErrorText: "Ha ocurrido un error al guardar el detalle del producto." });
      });
    }

    this.setState({ errorsForm });
  }

  getTypeImage (image) {
    var text = "";
    if (image != null && image.bucketurl != null) {
      text = image.bucketurl.split('.');
      text = text[text.length-1];
      text = "data:image/" + text + ";base64,";
    }
    return text;
  }
  
  render() {
    var { images, modalDetalle, detalleProducto, modalLoad, modalError, modalErrorText, errorsForm } = this.state;
    return (
      <>
        <Helmet>
          <title>
            {PAGE_TITLE_HOME} | {APP_TITLE}
          </title>
        </Helmet>
        <div>
          <PageTitle title={PAGE_TITLE_HOME} />
          <div className="toolbarCatalog">
            <div className="filtro">
              <TextField id="outlined-basic" label="Nombre, descripicón..." variant="outlined" />
              <Button className="button" onClick={() => this.filtrar()}>
                  <SearchIcon />
                  Buscar
              </Button>
            </div>
            <Button className="button" onClick={() => this.routeChange()}>
                <UploadFileIcon />
                Cargar imagen
            </Button>
          </div>
          <hr className="hr"></hr>
          <div className="catalog">
            { images && images.length > 0 && Array.isArray(images) && images.map((image) =>
              <div className="imgContainer">
                <img
                  onClick={() => this.abrirDetalle(image)}
                  // src={this.getTypeImage(image) + decodeURIComponent(escape(image.img_src))}
                  src={image.img_src}
                />
                <p onClick={() => this.abrirDetalle(image)} className="tituloImg">{image.mdm_descnormacomercial}</p>
              </div>
            )}
            {/* <Gallery
              images={images}
            /> */}
          </div>
        </div>

        {/* Modal detalle */}
        <Dialog
          maxWidth="lg"
          open={modalDetalle}
          onClose={() => { this.setState({ modalDetalle: false, errorsForm: [] })}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="modalCloseContainer">
            <h3>{detalleProducto.mdm_descnormacomercial}</h3>
            <IconButton
              aria-label="close"
              onClick={() => { this.setState({ modalDetalle: false, errorsForm: [] })}}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="modalContainer">
            <Grid item xs={6}>
              <div>
                <img
                  className="imgDetalle"
                  src={detalleProducto.img_src}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="formularioDetalle">
                <TextField error={errorsForm.key_producto} className="campoFormulario" id="outlined-basic" label="Código del producto" variant="outlined" value={detalleProducto.key_producto} onChange={(e) => this.changeFormDetalle(e, 'key_producto')} />
                <TextField error={errorsForm.codigo_cooperativa} className="campoFormulario" id="outlined-basic" label="Código cooperativa" variant="outlined" value={detalleProducto.codigo_cooperativa} onChange={(e) => this.changeFormDetalle(e, 'codigo_cooperativa')} />
                <TextField error={errorsForm.aecoc} className="campoFormulario" id="outlined-basic" label="AECOC" variant="outlined" value={detalleProducto.aecoc} onChange={(e) => this.changeFormDetalle(e, 'aecoc')} />
                <TextField error={errorsForm.mdm_descnormacarteleria} className="campoFormulario" id="outlined-basic" label="Descripción cartelería" variant="outlined" value={detalleProducto.mdm_descnormacarteleria} onChange={(e) => this.changeFormDetalle(e, 'mdm_descnormacarteleria')} />
                <TextField error={errorsForm.mdm_descnormacomercial} className="campoFormulario" id="outlined-basic" label="Descripción comercial" variant="outlined" value={detalleProducto.mdm_descnormacomercial} onChange={(e) => this.changeFormDetalle(e, 'mdm_descnormacomercial')} />
                <FormControlLabel control={<Switch checked={detalleProducto.isimagepublic} onChange={(e) => this.changeFormDetalle(e, 'isimagepublic')} />} label="Imagen pública" />
                <FormControlLabel control={<Switch checked={detalleProducto.isimageinerror} onChange={(e) => this.changeFormDetalle(e, 'isimageinerror')} />} label="Imagen error" />
                <Button className="button" onClick={() => this.guardarDetalle()}>
                    Guardar
                </Button>
              </div>
            </Grid>
          </div>
            
        </Dialog >

        {/* Modal load */}
        <Dialog
          maxWidth="lg"
          open={modalLoad}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <div className="modalContainer">
            <ReactLoading type="spinningBubbles" color="#30994c" />
          </div>
            
        </Dialog >

        {/* Modal error */}
        <Dialog
          maxWidth="lg"
          open={modalError}
          onClose={() => { this.setState({ modalError: false, modalErrorText: "" })}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="modalCloseContainer">
            <div></div>
            <IconButton
              aria-label="close"
              onClick={() => { this.setState({ modalError: false, modalErrorText: "" })}}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="modalContainer">
            <p className="textoModalError">{modalErrorText}</p>
          </div>
            
        </Dialog >

        </>
    );
  }

}
