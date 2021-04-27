//import './App.css';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar() {
  return (
    
    <body class="page-top" >
      
<nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div class="masthead">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto my-2 my-lg-0">
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#tete">Bluespoon </a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">Telecharger l'apk</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Services</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <header class="masthead" id="tete">
      <div class="container h-100">
                <div class="row h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-10 align-self-end">
                        <h2 class="text-uppercase text-white font-weight-bold">Bluespoon</h2>
                        <hr class="divider light my-4" />
                        <p class="text-white-50 mb-4">Application pour resto!</p>
                   
                    <div class="text-white-75 font-weight-light mb-5">
                        <Link class="btn btn-light btn-xl js-scroll-trigger" to={"/Home"}>s'inscrire</Link>
                    </div>
                    <div class="divider light my-4">
                        <Link class="btn btn-light btn-xl js-scroll-trigger" to={"/Connection"}>se connecter</Link>
                    </div>
                    
                    </div>
                </div>
            </div>
            </header>
            <section class="page-section bg-primary" id="about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text-white mt-0">Download</h2>
                        <hr class="divider light my-4" />
                        <p class="text-white-50 mb-4">Oui!</p>
                        <a class="btn btn-light btn-xl js-scroll-trigger" href="#services">Télécharger l'apk</a>
                    </div>
                </div>
            </div>
        </section>


        <section class="page-section" id="services">
            <div class="container">
                <h2 class="text-center mt-0">At Your Service</h2>
                <hr class="divider my-4" />
                <div class="row">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-gem text-primary mb-4"></i>
                            <h3 class="h4 mb-2">Sturdy Themes</h3>
                            <p class="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-laptop-code text-primary mb-4"></i>
                            <h3 class="h4 mb-2">Up to Date</h3>
                            <p class="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-globe text-primary mb-4"></i>
                            <h3 class="h4 mb-2">Ready to Publish</h3>
                            <p class="text-muted mb-0">You can use this design as is, or you can make changes!</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <i class="fas fa-4x fa-heart text-primary mb-4"></i>
                            <h3 class="h4 mb-2">Made with Love</h3>
                            <p class="text-muted mb-0">Is it really open source if it's not made with love?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </body>
  );
}

export default Navbar;