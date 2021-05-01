//import './App.css';
import './css/styles2.css';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar() {
    

  return (
    
    <body id="page-top" >
      
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Bluespoon</title>
        
        <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
        
        <script src="https://use.fontawesome.com/releases/v5.15.1/js/all.js" crossorigin="anonymous"></script>
      
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
       
        <link href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" rel="stylesheet" />
        
        <link href="./css/styles2.css" rel="stylesheet" />
    </head>

      <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-3" id="mainNav">
            <div class="container ">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">Bluespoon</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto my-2 my-lg-0">
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#head">Bluespoon </a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">Telecharger l'apk</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Services</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <header class="masthead" id='head' style={{height:'100%',width:'100%',marginTop:'0%'}}>
            <div class="container h-100">
                <div class="row h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-10 align-self-end">
                        <h1 class="text-uppercase text-white font-weight-bold">Bluespoon</h1>
                        <hr class="divider my-4" />
                        <h2 class="text-white-50 mb-4">Application pour resto!</h2>
                    </div>
                        <div class="col-lg-8 align-self-baseline">
                    
                    <div class="divider light my-4">
                        <Link class="btn btn-light btn-xl js-scroll-trigger" to={"/Connection"}>se connecter</Link>
                    </div>
                    <div class="text-white-75 font-weight-light mb-5">
                        <Link class="btn btn-light btn-xl js-scroll-trigger" to={"/Home"}>s'inscrire</Link>
                    </div>
                    <div class="text-white-75 font-weight-light mb-5">
                        <Link class="btn btn-light btn-xl js-scroll-trigger" to={"/Test"}>test</Link>
                    </div>
                    </div>
                </div>
            </div>
            </header>
            <section class="page-section bg-primary" id="about" style={{height:'100%',marginTop:'0%'}}>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text-white mt-0">Download</h2>
                        <hr class="divider light my-4" />
                        <a class="btn btn-light btn-xl js-scroll-trigger" href='./Blue.apk' download >Télécharger l'apk</a>
                    </div>
                </div>
            </div>
        </section>


        <section class="page-section" id="services" style={{height:400,marginTop:'0%'}}>
            <div class="container">
                <h2 class="text-center mt-0">Nos services:</h2>
                <hr class="divider my-4" />
                <div class="row">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-gem text-primary mb-4"></i>
                            <h3 class="h4 mb-2">Une application multi-fonctionnelle</h3>
                            <p class="text-muted mb-0">Commande à distance, gestion des commandes, moteur de recherche intégré</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-laptop-code text-primary mb-4"></i>
                            <h3 class="h4 mb-2">Votre Menu</h3>
                            <p class="text-muted mb-0">Etablissez votre menu comme vous le souhaitez en inscrivant votre restaurant</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-globe text-primary mb-4"></i>
                            <h3 class="h4 mb-2">?</h3>
                            <p class="text-muted mb-0">??</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-heart text-primary mb-4"></i>
                            <h3 class="h4 mb-2">?</h3>
                            <p class="text-muted mb-0">???</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <footer class="bg-light py-5">
            <div class="container"><div class="small text-center text-muted">Copyright © 2021 - Bluespoon</div></div>
        </footer>
        
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>
        
        <script src="/js/scripts2.js"></script>

    </body>
  );
}

export default Navbar;