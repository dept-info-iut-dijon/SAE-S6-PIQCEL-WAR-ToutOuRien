import express, { Request, Response, Router } from 'express';
import { Authentification } from '../Controllers/authentification';
import { Profile } from '../Controllers/profile';

const router: Router = express.Router();
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
  await profileController.getProfile(req,res);
  res.render('profil', { profileData: res.locals.profileData });
});

// Route for rendering the 'changeProfil' view
router.get('/changeProfile', async (req: Request, res: Response) => {
  await profileController.getProfile(req,res);
  res.render('changeProfile', { profileData: res.locals.profileData });
});

export = router;