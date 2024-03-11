import express, { Request, Response, Router } from 'express';
import { Authentification } from '../Controllers/authentification';
import { Profile } from '../Controllers/profile';

export const router: Router = express.Router();
const authController = new Authentification();
const profileController = new Profile();

// Route for rendering the 'index' view
router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

// Route for rendering the 'login' view
router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

// Route for handling POST request for user login
router.post('/login', (req: Request, res: Response) => {
  authController.postlogin(req, res);
});

// Route for rendering the 'signup' view
router.get('/signup', (req: Request, res: Response) => {
  res.render('signup');
});
  
// Route for handling POST request for user signup
router.post('/signup', (req: Request, res: Response) => {
  authController.postsignup(req, res);
});

// Route for rendering the 'code' view
router.get('/code', (req: Request, res: Response) => {
  res.render('code');
})

// Route for handling POST request for the code
router.post('/code', (req: Request, res: Response) => {
  if (authController.isAccessCodeValid(req.body['confirmationCode'])) {
    res.status(200).json({
      success: true
    });
  } else {
    res.status(500).json({
      fail: true
    });  
  }
});

// Route for rendering the 'profile' view
router.get('/profil', async (req: Request, res: Response) => {
  
 // Appel à authController.whoIsConnected()
  authController.whoIsConnected(req, res);

    // Gestion de la réponse après l'appel à authController.whoIsConnected()
  res.on('finish', () => {
    // Vérification du statut de la réponse
    if (res.statusCode === 200) {
        // Récupérer les données de la réponse
        let profileData = res.locals.data.session; // Assurez-vous que les données sont correctement formatées selon votre logique

        // Rendre le modèle 'profil' avec les données récupérées
        res.render('profil', { profileData });
    } else {
        // Gérer les cas où l'utilisateur n'est pas connecté ou d'autres erreurs
        // Peut-être rediriger vers une page de connexion, afficher un message d'erreur, etc.
    }
});
});

// Route for rendering the 'changeProfil' view
router.get('/changeProfile', async (req: Request, res: Response) => {
  await profileController.getProfile(req,res);
  res.render('changeProfile', { profileData: res.locals.profileData });
});
