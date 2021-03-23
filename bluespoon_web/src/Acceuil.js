import './Acceuil.css';
import React, { Component } from 'react';
import QRCode from'qrcode.react';
class Acceuil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chaine: [],
            cle:1,
            id:localStorage.getItem('id'),
            boisson: false
            
          };
          this.add = this.add.bind(this);
          this.send = this.send.bind(this);
    }
    componentDidMount(){
        fetch('http://192.168.0.8:3001/plats?idRestaurant='+this.state.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      let array = [];
      this.setState({ cle: 1 });
      for(let i=0; i<json.length;i++){
        array.push(<div className='rectAMargin' key={this.state.cle}><span className='Span'>plat:</span><input className='Input' id={this.state.cle+'plat'} defaultValue={json[i]['nomPlat']}/><span className='Span'>prix:</span><input className='Input' defaultValue={json[i]['prix']} placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input className='Input' defaultValue={json[i]['commentaires']} placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/></div>);
        array.push(<div className='rectA' key={this.state.cle+1}><span className='Span'>boisson?<input type='checkbox' onPress={()=> this.setState({boisson:!this.state.boisson})} /></span><span className='Span'>ajouter une image</span><input type="file" className='Input' id={this.state.cle+'image'} accept="image/png, image/jpeg"/><button className='Button' onClick={this.modif} value={this.state.cle}>modifier</button></div>);
        this.setState({ cle: this.state.cle+2 });
      }

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
    add(){
        let array = this.state.chaine;
        array.push(<div className='rectAMargin' key={this.state.cle}><span className='Span'>plat:</span><input className='Input' placeholder='nom du plat'  id={this.state.cle+'plat'}/><span className='Span'>prix:</span><input className='Input' placeholder='prix'  id={this.state.cle + 'prix'}/><span className='Span'>commentaires:</span><input className='Input' placeholder='commentaires éventuels'  id={this.state.cle + 'com'}/></div>);
        array.push(<div className='rectA' key={this.state.cle+1}><span className='Span'>boisson?<input type='checkbox' onPress={()=> this.setState({boisson:!this.state.boisson})} /></span><span className='Span'>ajouter une image:</span><input type="file" className='Input' id={this.state.cle+'image'} accept="image/png, image/jpeg"/><button className='Button' onClick={this.send} value={this.state.cle}>confirmer</button></div>);
        this.setState({chaine : array});
        this.setState({ cle: this.state.cle+2 });
    }
    send(cle){
        let platB = document.getElementById(cle.target.value+ 'plat').value;
        let prixB = document.getElementById(cle.target.value+ 'prix').value;
        let commentairesB = document.getElementById(cle.target.value+ 'com').value;
        let imageB = document.getElementById(cle.target.value+ 'image').value;
        const file = document.getElementById(cle.target.value+ 'image').files[0];
        var blob = new Blob([file]);
        /*
        const fileInput = document.querySelector(imageB) ;
        //const fileInput = document.getElementById(cle.target.value+ 'image').files[0].name; 
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        */
        fetch('http://192.168.0.8:3001/ajoutPlat', {
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
            image: blob,
            boisson:this.state.boisson
        })
      });
    }
    modif(cle){
        let platB = document.getElementById(cle.target.value+ 'plat').value;
        let prixB = document.getElementById(cle.target.value+ 'prix').value;
        let commentairesB = document.getElementById(cle.target.value+ 'com').value;
        let imageB = document.getElementById(cle.target.value+ 'image').value;
        const file = document.getElementById(cle.target.value+ 'image').files[0];
        var blob = new Blob([file]);
        /*
        const fileInput = document.querySelector(imageB) ;
        //const fileInput = document.getElementById(cle.target.value+ 'image').files[0].name; 
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        */
        fetch('http://192.168.0.8:3001/modifPlat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
            idPlat:cle.target.value,
            idRestaurant:1,
            plat:platB,
            commentaires:commentairesB,
            prix:prixB,
            image: blob
        })
      });
    }
     downloadQR = () => {
        const canvas = document.getElementById("qr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

    render(){
        return (
            <div className="containerA" id='base'>
            
            {this.state.chaine.map((value) => value)}
            <button className='Button' onClick={this.add}>ajouter un plat</button>
            <div className='rectAMargin'>
            <span className='Span'>votre QR code:</span>
            <QRCode className='qr' id='qr' value={"http://127.0.0.1:19002/Table/"+this.state.id} />
            <button className='Button' onClick={this.downloadQR}>Télécharger le QR code</button>
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