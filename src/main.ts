import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter} from '@angular/router';
import { appRoutes } from './app/app.routes';
import 'alpinejs';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, setPersistence, browserLocalPersistence } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AuthService } from './app/auth.service';

const app = initializeApp({
  apiKey: "AIzaSyBltZ_l8CkPjYoZnIcUJtCVpEnQ_-zTYKA",
  authDomain: "expense-pro-aac01.firebaseapp.com",
  projectId: "expense-pro-aac01",
  storageBucket: "expense-pro-aac01.firebasestorage.app",
  messagingSenderId: "838082821322",
  appId: "1:838082821322:web:76e33960fbe31b3b9dc833",
  measurementId: "G-P6BSVY7BCV"
});

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    bootstrapApplication(AppComponent, {
      providers: [
        provideRouter(appRoutes) ,
        AuthService,
        provideHttpClient(),
        provideFirebaseApp(() => app),
        provideFirestore(() => getFirestore(app)),
        provideAuth(() => auth),
      ],
    }).catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });
