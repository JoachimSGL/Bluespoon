//import './Acceuil.css';
import './css/styles3.css'
import React, { Component } from 'react';
import QRCode from'qrcode.react';
import JSZip from 'jszip' ;
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from "./firebase";
class Acceuil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaine: [{nomPlat:'',commentaires:'',prix:''}],
            cle:0,
            id:(localStorage.getItem('id')?localStorage.getItem('id') : 0),
            boisson: false,
            liste:[],
            visible:false,
            value:1,
            keepId : [],
            progress:0,
            url:[],
            error:false
          };
          this.add = this.add.bind(this);
          this.addServeur = this.addServeur.bind(this);
          this.send = this.send.bind(this);
          this.modif = this.modif.bind(this);
          this.changement = this.changement.bind(this);
          this.suppr = this.suppr.bind(this);
          this.changeNom = this.changeNom.bind(this);
    }
    componentDidMount(){
      if(this.state.id===0){
        this.props.history.push("/Home");
      }
        fetch('https://bluespoon-app.herokuapp.com/all?idRestaurant='+this.state.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      //let array = [];
      this.setState({ cle: 0 });
      //let compteur = 2;
      let arr = [];
      //let arrDef=[];
      for(let i=0; i<json.length;i++){
        console.log(json[i].idPlat);
       //arr.push(json[i].idPlat);
        arr.push({nomPlat:json[i].nomPlat,prix:json[i].prix,commentaires : json[i].commentaires,boisson:json[i].boisson,id:json[i].idPlat,image:false,new:false})
        /*
        arrDef.push(<div class="input-group mb-3" key={compteur}><span className="input-group-text">plat:</span><input className='form-control' id={compteur+'plat'} defaultValue={json[i]['nomPlat']}/><span className='input-group-text'>prix:</span><input className='form-control' defaultValue={json[i]['prix']} placeholder='prix'  id={compteur + 'prix'}/><span className='input-group-text'>commentaires:</span><input className='form-control' defaultValue={json[i]['commentaires']} placeholder='commentaires éventuels'  id={compteur + 'com'}/></div>);
        if(json[i].boisson){
          arrDef.push(<div class="input-group mb-3" key={compteur+1}><span className='input-group-text'>boisson?<input type='checkbox' id={compteur+'boiss'}/></span><span className='input-group-text'>ajouter une image</span><input type="file" className='form-control' id={compteur+'image'} accept="image/png, image/jpeg"/><Button  onClick={this.modif} value={compteur}>modifier</Button><Button  style={{backgroundColor:"#00005c"}}onClick={this.suppr} value={compteur}>Supprimer</Button></div>);
        }else{
          arrDef.push(<div class="input-group mb-3" key={compteur+1}><span className='input-group-text'>boisson?<input type='checkbox' id={compteur+'boiss'}/></span><span className='input-group-text'>ajouter une image</span><input type="file" className='form-control' id={compteur+'image'} accept="image/png, image/jpeg"/><Button  onClick={this.modif} value={compteur}>modifier</Button><Button  style={{backgroundColor:"#00005c"}} onClick={this.suppr} value={compteur}>Supprimer</Button></div>);
        }*/
        //array.push(<div class="input-group mb-3">{arrDef}</div>)
        //arrDef=[];
        //compteur++;
        //compteur++;
      }
      //this.setState({cle:compteur});
      //this.setState({keepId : arr});
      this.setState({ chaine: arr });
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
    suppr(cle){
      let id = this.state.chaine[cle].id;
      fetch('https://bluespoon-app.herokuapp.com/deletePlat', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  //'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({
                    idPlat:id,
                    idRestaurant:parseInt(this.state.id),
                    password:'4A1cDm$12$'

                })
              }).then(response => response.json())
              .then((json) => {

                if(json!=='done'){
                  this.setState({error:true})
                }
              });
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
                    nomPlat:plat,
                    password:'4A1cDm$12$'

                })
              });
            });
        }
      );
    };
    add(){
        let array = this.state.chaine;
        /*
        array.push(<div class="input-group mb-3" key={this.state.cle}><span  class="input-group-text">plat:</span><input class="form-control" placeholder='nom du plat'  id={this.state.cle+'plat'}/><span className='Span'>prix:</span><input class="form-control" placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input class="form-control" placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/></div>);
        array.push(<div class="input-group mb-3" key={this.state.cle+1}><span className='input-group-text'>boisson?<input  type='checkbox' onClick={()=> this.setState({boisson:!this.state.boisson})} id={this.state.cle+'boiss'}/></span><span className='input-group-text'>ajouter une image:</span><input type="file" class="form-control" id={this.state.cle+'image'} accept="image/png, image/jpeg"/><Button className='Button' onClick={this.send} value={this.state.cle}>confirmer</Button></div>);
        array = [<div class="input-group mb-3">{array}</div>]*/
        array.push({nomPlat:'',prix:'',commentaires : '',boisson:false,id:0,image:true,new:true})

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
      let id = this.state.id;
      let platB = this.state.chaine[cle].nomPlat;
      let prixB = this.state.chaine[cle].prix;
      let commentairesB = this.state.chaine[cle].commentaires;
      let boissonBool = this.state.chaine[cle].boisson;

        let imageB = document.getElementById(cle).value;
        let arr=imageB.split("\\");
        imageB=arr[arr.length-1];
        imageB = Date.now()+imageB.slice(-4);
        let type= imageB.slice(-3);
        let file = document.getElementById(cle).files[0];
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
            idRestaurant:id,
            plat:platB,
            commentaires:commentairesB,
            prix:prixB,
            imagePlat:imageB,
            boisson:boissonBool,
            password:'4A1cDm$12$'
        })
      }).then(()=>{
        let arr = this.state.chaine;
        arr[cle].new = false;
        this.setState({chaine:arr});
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
        
        let id = this.state.id;
        let platB = this.state.chaine[cle].nomPlat;
        let prixB = this.state.chaine[cle].prix;
        let commentairesB = this.state.chaine[cle].commentaires;
        let boissonBool = this.state.chaine[cle].boisson;
        let idPlat = this.state.chaine[cle].id;
      console.log(this.state.chaine[cle])
      if(this.state.chaine[cle].image){
          let imageB = document.getElementById(cle).value;
          let arr=imageB.split("\\");
          imageB=arr[arr.length-1];
          imageB = Date.now()+imageB.slice(-4);
          let type= imageB.slice(-3);
          let file = document.getElementById(cle).files[0];
          var blob = file.slice(0, file.size, 'image/png'); 
          file = new File([blob], imageB, {type: 'image/'+type});
          
          
          fetch('https://bluespoon-app.herokuapp.com/modifPlatAvecImage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'true'
          },
          body: JSON.stringify({
              idPlat:idPlat,
              idRestaurant:id,
              plat:platB,
              commentaires:commentairesB,
              prix:prixB,
              imagePlat:imageB,
              boisson : boissonBool,
              password:'4A1cDm$12$'
          })
        });
        
        this.handleUpload(file,platB)
    }else{
      fetch('https://bluespoon-app.herokuapp.com/modifPlat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
            idPlat:idPlat,
            idRestaurant:id,
            plat:platB,
            commentaires:commentairesB,
            prix:prixB,
            boisson : boissonBool,
            password:'4A1cDm$12$'
        })
      });
    }
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
      
        this.setState({visible:false});
      };
      setImageTrue(cle){
        let arr = this.state.chaine;
        arr[cle].image=true;
        this.setState({chaine:arr});
      }
      changeBoisson(cle){
        let arr = this.state.chaine;
        arr[cle].boisson=!arr[cle].boisson;
        this.setState({chaine:arr});
      }
      changeNom(cle,text){
        let arr = this.state.chaine;
        arr[cle].nomPlat=text.target.value;
        this.setState({chaine:arr});
      }
      changeCommentaires(text,cle){
        let arr = this.state.chaine;
        arr[cle].commentaires=text.target.value;
        this.setState({chaine:arr});
      }
      changePrix(text,cle){
        let arr = this.state.chaine;
        arr[cle].prix=text.target.value;
        this.setState({chaine:arr});
      }
     

    render(){
        return (
             

           <body class="bg-primary">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                    {this.state.chaine.map((l,i) => {
                        return(<div class="container2">
                            <div class="row justify-content-center">
                                <div class="col-lg-7">
                                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                                        <div class="card-header"><h3 class="text-center font-weight-light my-4">{l.nomPlat}</h3></div>
                                        <div class="card-body">
                                            <form>
                                                
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">nom du plat</label>
                                                    <input class="form-control py-4"  type="text" aria-describedby="emailHelp"  placeholder="Inscrivez le nom de votre plat"  onChange={(text)=>{this.changeNom(i, text)}} value={l.nomPlat}/>
                                                </div>
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">Commentaires</label>
                                                    <input class="form-control py-4"  type="text" aria-describedby="emailHelp" placeholder="Indication supplémentaire sur votre plat" value={l.commentaires} onChange={(text)=>{this.changeCommentaires(text,i)}}/>
                                                </div>
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="small mb-1" for="inputFirstName">prix</label>
                                                            <input class="form-control py-4"  type="text" placeholder="En euro" value={l.prix} onChange={(text)=>{this.changePrix(text,i)}}/>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="small mb-1" for="inputLastName">Boisson ?</label>
                                                            {l.boisson &&
                                                            <input class="form-control py-4"  type='checkbox' placeholder="Indication supplémentaire sur votre plat" checked onClick={()=>{this.changeBoisson(i)}}/>
                                                            }
                                                            {!l.boisson &&
                                                              <input class="form-control py-4"  type='checkbox' placeholder="Indication supplémentaire sur votre plat"  onClick={()=>{this.changeBoisson(i)}}/>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {l.image &&
                                                <div class="form-group" >
                                                    <label class="small mb-1" for="inputEmailAddress">Image</label>
                                                    <input class="form-control py-4" id={i} type="file" aria-describedby="emailHelp" placeholder="Indication supplémentaire sur votre plat" />
                                                </div>
                                                  }
                                                  {!l.image &&
                                                      <div class="form-group mt-4 mb-0"><input type="button" class="btn btn-secondary btn-block" onClick={()=>{this.setImageTrue(i)}} value="Changer l'image ?"/></div>
                                                  }
                                                  {l.new &&
                                                      <div class="form-group mt-4 mb-0"><input type="button" class="btn btn-primary btn-block" onClick={()=>{this.send(i)}} value='Confirmer'/></div>
                                                  }
                                                {!l.new &&
                                                      <div class="form-group mt-4 mb-0"><input type="button" class="btn btn-primary btn-block" onClick={()=>{this.modif(i)}} value='Modifier'/>
                                                      <input type="button"  class="btn btn-primary btn-block" onClick={()=>{this.suppr(i)}} value={'Supprimer'}/></div>
                                                  }
                                            </form>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )},this)}
                    </main>
                </div>
                {this.state.error &&
                <p style={{color:'red',fontSize:25}}>Ce plat est en cours de commande et ne peut pas être supprimer</p>

                }
                <input type="button" class="btn btn-secondary btn-block" onClick={this.add} value='ajouter un plat'/>
                <div className='rectAMargin'>

            
            <div class="form-group">
            <span style={{color:'white',fontSize:18}}>Combien de Qr-codes voulez-vous?:</span>
                <input class="form-control py-4"  type='number' aria-describedby="emailHelp" placeholder="Combien de QR codes souhaitez-vous" value={this.state.value} onChange={this.changement}/>
            </div>
            <input type="button" class="btn btn-secondary btn-block"  onClick={this.downloadQR} value="Télécharger les QR-codes"/>
          
            </div>
            <div>
            {this.state.liste.map((l, i) =>    (
            <QRCode className='qr' id={'qr'+l} value={"https://bluespoon-app.herokuapp.com/Table/"+this.state.id+"/"+l} />
            ))} 
           
           </div>
                
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="js/scripts.js"></script>
        </body>
           


            
        );
    };
}
/*

<input type="file" className='Input' id={this.state.cle+'image'} accept="image/png, image/jpeg">
        array.push(<div className='rectA' key={this.state.cle}><span className='Span'>plat:</span><input className='Input' placeholder='nom du plat'  id={this.state.cle+'plat'}/><span className='Span'>prix:</span><input className='Input' placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input className='Input' placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/><button className='Button' onClick={this.send} value={this.state.cle}>confirmer</button></div>);

*/

export default Acceuil;