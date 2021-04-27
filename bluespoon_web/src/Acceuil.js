import './Acceuil.css';
import React, { Component } from 'react';
import QRCode from'qrcode.react';
import JSZip from 'jszip' ;
import { saveAs } from 'file-saver';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from "./firebase";
class Acceuil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaine: [],
            cle:0,
            id:(localStorage.getItem('id')?localStorage.getItem('id') : 1),
            boisson: false,
            liste:[],
            visible:false,
            value:1,
            keepId : [],
            progress:0,
            url:[]
          };
          this.add = this.add.bind(this);
          this.addServeur = this.addServeur.bind(this);
          this.send = this.send.bind(this);
          this.modif = this.modif.bind(this);
          this.changement = this.changement.bind(this);
    }
    componentDidMount(){
      this.getImage()
        fetch('https://bluespoon-app.herokuapp.com/all?idRestaurant='+this.state.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      let array = [];
      this.setState({ cle: 0 });
      let compteur = 2;
      let arr = [];
      let arrDef=[];
      for(let i=0; i<json.length;i++){
        console.log(json[i].idPlat);
        arr.push(json[i].idPlat);
        arrDef.push(<div class="input-group mb-3" key={compteur}><span className="input-group-text">plat:</span><input className='form-control' id={compteur+'plat'} defaultValue={json[i]['nomPlat']}/><span className='input-group-text'>prix:</span><input className='form-control' defaultValue={json[i]['prix']} placeholder='prix'  id={compteur + 'prix'}/><span className='input-group-text'>commentaires:</span><input className='form-control' defaultValue={json[i]['commentaires']} placeholder='commentaires éventuels'  id={compteur + 'com'}/></div>);
        if(json[i].boisson){
          arrDef.push(<div class="input-group mb-3" key={compteur+1}><span className='input-group-text'>boisson?<input type='checkbox' id={compteur+'boiss'}/></span><span className='input-group-text'>ajouter une image</span><input type="file" className='form-control' id={compteur+'image'} accept="image/png, image/jpeg"/><Button  onClick={this.modif} value={compteur}>modifier</Button></div>);
        }else{
          arrDef.push(<div class="input-group mb-3" key={compteur+1}><span className='input-group-text'>boisson?<input type='checkbox' id={compteur+'boiss'}/></span><span className='input-group-text'>ajouter une image</span><input type="file" className='form-control' id={compteur+'image'} accept="image/png, image/jpeg"/><Button  onClick={this.modif} value={compteur}>modifier</Button></div>);
        }
        array.push(<div class="input-group mb-3">{arrDef}</div>)
        arrDef=[];
        compteur++;
        compteur++;
      }
      this.setState({cle:compteur});
      this.setState({keepId : arr});
      this.setState({ chaine: array });
    });
        /*
        let array = [];
        array.push(<div className='rectAMargin' key={this.state.cle}><span className='Span'>plat:</span><input className='Input' placeholder='nom du plat'  id={this.state.cle+'plat'}/><span className='Span'>prix:</span><input className='Input' placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input className='Input' placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/></div>);
        array.push(<div className='rectA' key={this.state.cle+1}><span className='Span'>ajouter une image</span><input type="file" className='Input' id={this.state.cle+'image'} accept="image/png, image/jpeg"/><button className='Button' onClick={this.send} value={this.state.cle-1}>confirmer</button></div>);
        this.setState({chaine : array});
        this.setState({ cle: this.state.cle+2 });
        */    
    }
    changement(txt){
      this.setState({value : txt.target.value});
      let arr =[];
      for(let i = 1 ; i <parseInt(txt.target.value)+1 ;i++){
        arr.push(i);
      }
      this.setState({liste : arr});
    }
    handleUpload(image,plat){
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({progress:progress});
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              fetch('https://bluespoon-app.herokuapp.com/changeImage', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({
                    url:url,
                    idRestaurant:this.state.id,
                    nomPlat:plat

                })
              });
            });
        }
      );
    };
    add(){
        let array = this.state.chaine;
        array.push(<div class="input-group mb-3" key={this.state.cle}><span  class="input-group-text">plat:</span><input class="form-control" placeholder='nom du plat'  id={this.state.cle+'plat'}/><span className='Span'>prix:</span><input class="form-control" placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input class="form-control" placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/></div>);
        array.push(<div class="input-group mb-3" key={this.state.cle+1}><span className='input-group-text'>boisson?<input  type='checkbox' onClick={()=> this.setState({boisson:!this.state.boisson})} id={this.state.cle+'boiss'}/></span><span className='input-group-text'>ajouter une image:</span><input type="file" class="form-control" id={this.state.cle+'image'} accept="image/png, image/jpeg"/><Button className='Button' onClick={this.send} value={this.state.cle}>confirmer</Button></div>);
        array = [<div class="input-group mb-3">{array}</div>]
        this.setState({chaine : array});
        this.setState({ cle: this.state.cle+2 });
    }
    addServeur(){
      this.props.history.push("/CompteServeur");
    }
    async getImage(){
      const ref = storage.ref('images/1619196381261.jpg');
      let url = await ref.getDownloadURL();
      this.setState({url:url});
      console.log(url);
    }
    send(cle){
        cle = cle.target.value;
        let platB = document.getElementById(cle+ 'plat').value;
        let prixB = document.getElementById(cle+ 'prix').value;
        let commentairesB = document.getElementById(cle+ 'com').value;
        let boissonBool = document.getElementById(cle+ 'boiss').checked;
        console.log(boissonBool);
        let imageB = document.getElementById(cle+ 'image').value;
        let arr=imageB.split("\\");
        imageB=arr[arr.length-1];
        imageB = Date.now()+imageB.slice(-4);
        let type= imageB.slice(-3);
        let file = document.getElementById(cle+ 'image').files[0];
        var blob = file.slice(0, file.size, 'image/png'); 
        file = new File([blob], imageB, {type: 'image/'+type});
        /*
        const fileInput = document.querySelector(imageB) ;
        //const fileInput = document.getElementById(cle.target.value+ 'image').files[0].name; 
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        */
        fetch('https://bluespoon-app.herokuapp.com/ajoutPlat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
            idRestaurant:this.state.id,
            plat:platB,
            commentaires:commentairesB,
            prix:prixB,
            imagePlat:imageB,
            boisson:boissonBool
        })
      });
      this.handleUpload(file,platB);
        
      /*
      var formData = new FormData();
      formData.append('file', file);
      console.log(file);
      fetch('https://bluespoon-app.herokuapp.com/image', {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          //'Content-Type': 'multipart/form-data',
          //'Access-Control-Allow-Origin': 'true'
        },
        body:formData,
      });
      */
      /*
      fetch('https://bluespoon-app.herokuapp.com/image', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'true'
        },
        body: {
            file: file
        }
      });*/

    }
    modif(cle){
        cle = cle.target.value;
        console.log(this.state.keepId[(parseInt(cle)/2)-1]);
        let id = this.state.id;
        let platB = document.getElementById(cle+ 'plat').value;
        let prixB = document.getElementById(cle+ 'prix').value;
        let commentairesB = document.getElementById(cle+ 'com').value;
        let boissonBool = document.getElementById(cle+ 'boiss').checked;
        console.log(boissonBool);
        
        let imageB = document.getElementById(cle+ 'image').value;
        let arr=imageB.split("\\");
        imageB=arr[arr.length-1];
        imageB = Date.now()+imageB.slice(-4);
        let type= imageB.slice(-3);
        let file = document.getElementById(cle+ 'image').files[0];
        var blob = file.slice(0, file.size, 'image/png'); 
        file = new File([blob], imageB, {type: 'image/'+type});
        //var blob = new Blob([file]);
        /*
        const fileInput = document.querySelector(imageB) ;
        //const fileInput = document.getElementById(cle.target.value+ 'image').files[0].name; 
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        */
        fetch('https://bluespoon-app.herokuapp.com/modifPlat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
            idPlat:this.state.keepId[(parseInt(cle)/2)-1],
            idRestaurant:id,
            plat:platB,
            commentaires:commentairesB,
            prix:prixB,
            imagePlat:imageB,
            boisson : boissonBool
        })
      });
      /*
      var formData = new FormData();
      formData.append('file', file);
      console.log(file);
      fetch('https://bluespoon-app.herokuapp.com/image', {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          //'Content-Type': 'multipart/form-data',
          //'Access-Control-Allow-Origin': 'true'
        },
        body:formData,
      });*/
      this.handleUpload(file,platB)
    }
     downloadQR = () => {
        this.setState({visible:true});
        var zip = new JSZip();
        var qr = zip.folder("qr");
        for(let i = 0;i<this.state.liste.length;i++){
          let canvas = document.getElementById("qr"+this.state.liste[i]);
          canvas = canvas.toDataURL("image/png");
          canvas = canvas.replace('data:image/png;base64,','')
          qr.file('QR_Table_'+this.state.liste[i]+'.png',canvas,{base64: true});
        }
        zip.file("info.txt", "Tous vos qr code sonnt dans le fichier qr\n merci d'utiliser Bluespoon!");
        /*
        var qr = zip.folder("qr");
        qr.file("qr.png", pngUrl, {base64: true});
        */
        zip.generateAsync({type:"blob"}).then(function(content) {
          // see FileSaver.js
          saveAs(content, "QR.zip");
      });
      /*
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        //downloadLink.click();
        document.body.removeChild(downloadLink);















        <button className='Button' onClick={this.addServeur}>ajouter un compte serveur</button>
        */
        this.setState({visible:false});
      };

    render(){
        return (
             
            <div className="masthead" style={{backgroundColor:'#7DAEE7'}} id='base'>
            
            {this.state.chaine.map((value) => value)}
            <Button onClick={this.add}>ajouter un plat</Button>
            <div className='rectAMargin'>

            <span className='Span'>Combien de Qr-codes voulez-vous?:</span>
            <span className='Span'>à chaque qr-codes correspond une table</span>
            <input className='Input' type='number' placeholder='nom du plat'  id={'ufi'} value={this.state.value} onChange={this.changement}/>
            <span className='Span'>vos QR-codes:</span>
            <Button className='Button' onClick={this.downloadQR}>Télécharger les QR-codes</Button>
          
            </div>
            <div>
            {this.state.liste.map((l, i) =>    (
            <QRCode className='qr' id={'qr'+l} value={"https://bluespoon-app.herokuapp.com/Table/"+this.state.id+"/"+l} />
            ))} 
           
           </div>
            </div>


            
        );
    };
}
/*

<input type="file" className='Input' id={this.state.cle+'image'} accept="image/png, image/jpeg">
        array.push(<div className='rectA' key={this.state.cle}><span className='Span'>plat:</span><input className='Input' placeholder='nom du plat'  id={this.state.cle+'plat'}/><span className='Span'>prix:</span><input className='Input' placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input className='Input' placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/><button className='Button' onClick={this.send} value={this.state.cle}>confirmer</button></div>);

*/

export default Acceuil;