import express, { Request, Response, Router } from 'express';
import { Authentification } from '../Controllers/authentification';
import { Profile } from '../Controllers/profile';

export const router: Router = express.Router();
const authController = new Authentification();
const profileController = new Profile();
let isConnected = false;
let token = "";

// Route for rendering the 'index' view
router.get('/', (req: Request, res: Response) => {
  res.render('index', {'isConnected': isConnected});
});

// Route for rendering the 'login' view
router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

// Route for handling POST request for user login
router.post('/login', (req: Request, res: Response) => {
  authController.postlogin(req, res);
  if(res.statusCode == 200){
    isConnected = true;
  }
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
  await authController.whoIsConnected(req, res);

  if(res.statusCode == 200){
    console.log(res.locals.sessionData.userAccount);
    res.render('profil', {profileData : res.locals.sessionData.userAccount});
  
  }
});

// Route for rendering the 'changeProfil' view
router.get('/changeProfile', async (req: Request, res: Response) => {
  await profileController.getProfile(req,res);
  res.render('changeProfile', { profileData: res.locals.profileData });
});
