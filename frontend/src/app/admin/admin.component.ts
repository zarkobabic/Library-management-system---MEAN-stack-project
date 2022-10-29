
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { Loan } from '../model/loan';
import { Requests } from '../model/requests';
import { SysVariable } from '../model/sys';
import { User } from '../model/user';
import { BookServiceService } from '../services/book-service.service';
import { LoanServiceService } from '../services/loan-service.service';
import { RequestsServiceService } from '../services/requests-service.service';
import { SysVariableServiceService } from '../services/sys-variable-service.service';
import { UserServiceService } from '../services/user-service.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent implements OnInit {

  constructor(private userService: UserServiceService, private requestService: RequestsServiceService,
    private mainRouter: Router, private domSanitizer: DomSanitizer, private bookService: BookServiceService, private loanService: LoanServiceService, private sysVariableService: SysVariableServiceService) { }

  ngOnInit(): void {
    this.requestService.getAll().subscribe((data: Requests[])=>{
      this.requestsToConfirm = data;
    })
    let loggingUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggingUser.type!='admin'){
      this.mainRouter.navigate(['']);
  }
  
  this.userService.getAll().subscribe((data: User[]) => {
    this.allUsers = data;
  })

  this.sysVariableService.getExtendPeriod().subscribe((helper: SysVariable)=>{
    this.extendParametar = helper.extendPeriod;
  })
  
  
}

  active = 'main';
  readerUser: User = JSON.parse(localStorage.getItem('loggedUser'));

  



//----------------------Profil---------------------


profilePicture: string
profilePictureAddingMessage: string
profileIsSaved: boolean

addProfilePicture(fileInput: any) {
  this.profilePictureAddingMessage = null;
  this.profilePicture = null
  this.profileIsSaved = false
  if (fileInput.target.files && fileInput.target.files[0]) {

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];


          const imgBase64Path = e.target.result;
          this.profilePicture = imgBase64Path;
          this.profileIsSaved = true;
          return true
      };
    };

    reader.readAsDataURL(fileInput.target.files[0]);
  }
}

profilePicturePath() {
  return this.domSanitizer.bypassSecurityTrustUrl(this.profilePicture)
}


/*-----------------Registration--------------*/

profileRegisterName: string = this.readerUser.name;
profileRegisterLastName: string = this.readerUser.lastName;
profileRegisterAddress: string = this.readerUser.address;
profileRegisterContact: string = this.readerUser.contact;
profileRegisterEmail: string = this.readerUser.email;
profileRegisterUsername: string = this.readerUser.username;
profileRegisterPassword: string = this.readerUser.password;
profileRegisterConfirmPassword: string = this.readerUser.password;
oldUsername: string = this.readerUser.username;

profileRegisterNameMessage: string;
profileRegisterLastNameMessage: string;
profileRegisterAddressMessage: string;
profileRegisterContactMessage: string;
profileRegisterEmailMessage: string;
profileRegisterUsernameMessage: string;
profileRegisterPasswordMessage: string;
profileRegisterConfirmPasswordMessage: string;
profileRequiredPictureMessage: string;
profileRequiredRegexMessage: string;

profileEmailAlreadyUsed: boolean = false;
profileUsernameAlreadyUsed: boolean = false;
profileValidationSuccess: boolean = false;









update(){
    /*-----Provera svega zivog i nezivog--- */

    this.userService.checkUsername(this.profileRegisterUsername).
    subscribe((logginUser: User)=>{
      if(logginUser){
        if(logginUser.username == this.readerUser.username){
          this.profileUsernameAlreadyUsed = false; //izmenio neki svoj drugi podatak
        }
        else{
          this.profileUsernameAlreadyUsed = true;
        }
      }
      else{
        this.profileUsernameAlreadyUsed = false;
      }
      
              this.userService.checkEmail(this.profileRegisterEmail).
            subscribe((logginUser: User)=>{
              if(logginUser){
                if(logginUser.email == this.readerUser.email){
                  this.profileEmailAlreadyUsed = false; //izmenio neki svoj drugi podatak
                }
                else{
                  this.profileEmailAlreadyUsed = true;
                }                
              }
              else{
                this.profileEmailAlreadyUsed = false;
              }

              
    this.profileRegisterNameMessage = null;
    this.profileRegisterLastNameMessage= null;
    this.profileRegisterAddressMessage= null;
    this.profileRegisterContactMessage= null;
    this.profileRegisterEmailMessage= null;
    this.profileRegisterUsernameMessage=null;
    this.profileRegisterPasswordMessage= null;
    this.profileRegisterConfirmPasswordMessage= null;
    this.profileRequiredPictureMessage = null;
    this.profileRequiredRegexMessage = null;
    this.profileValidationSuccess = false;
    

  if(this.profileRegisterName == null || this.profileRegisterName == ''){
    this.profileRegisterNameMessage = "Polje za ime ne sme biti prazno";
  }
  if(this.profileRegisterLastName == null|| this.profileRegisterLastName == ''){
    this.profileRegisterLastNameMessage = "Polje za prezime ne sme biti prazno";
  }
  if(this.profileRegisterAddress == null|| this.profileRegisterAddress == ''){
    this.profileRegisterAddressMessage = "Polje za adresu ne sme biti prazno"
  }
  if(this.profileRegisterContact == null|| this.profileRegisterContact == ''){
    this.profileRegisterContactMessage = "Polje za kontakt ne sme biti prazno"
  }
  if(this.profileRegisterEmail == null|| this.profileRegisterEmail == ''){
    this.profileRegisterEmailMessage = "Polje za email ne sme biti prazno"
  }
  if(this.profileRegisterUsername == null|| this.profileRegisterUsername == ''){
    this.profileRegisterUsernameMessage = "Polje za korisnicko ime ne sme biti prazno"
  }



  


  if(this.profileRegisterName == null || this.profileRegisterName == '' || this.profileRegisterLastName == null|| this.profileRegisterLastName == '' || this.profileRegisterAddress == null|| this.profileRegisterAddress == ''||
  this.profileRegisterContact == null|| this.profileRegisterContact == '' || this.profileRegisterEmail == null|| this.profileRegisterEmail == '' || this.profileRegisterUsername == null|| this.profileRegisterUsername == ''){
    return false;
  }

  

  if(this.profileEmailAlreadyUsed){
    //greska vec koriscen username
    
    this.profileRegisterEmailMessage="Greska, vec iskoriscen email, morate odabrati novi";
    return false;
  }

  if(this.profileUsernameAlreadyUsed){
    //greska vec koriscen username
    this.profileRegisterUsernameMessage="Greska, vec iskorisceno korisnicko ime, morate odabrati novo";
    return false;
  }

  if(this.profilePicture == null){this.profilePicture = this.readerUser.picture}



  this.userService.updateInfo(this.profileRegisterUsername, this.profileRegisterName, this.profileRegisterLastName, this.profileRegisterAddress, this.profileRegisterContact, this.profileRegisterEmail, this.profilePicture, this.oldUsername).subscribe(respObj=>{
   if(respObj['message'] == "ok"){

    /*Updatovanje korisnika u sesiji */
      
      this.readerUser.username = this.profileRegisterUsername;
      this.readerUser.name = this.profileRegisterName;
      this.readerUser.lastName = this.profileRegisterLastName;
      this.readerUser.address = this.profileRegisterAddress;
      this.readerUser.contact = this.profileRegisterContact;
      this.readerUser.email = this.profileRegisterEmail;
      this.readerUser.picture = this.profilePicture;



      localStorage.setItem('loggedUser', JSON.stringify(this.readerUser));
  

      this.profileValidationSuccess = true;
   }
   else this.profileValidationSuccess = false;
  })
  

  return true;


            
          })



    })


}



//UPDATUJ KORISNIKA U SESIJI



//----------------------Odjava---------------------
logOut(){
  //invalidiranje sesije
  //localStorage.removeItem('loggedUser');
  localStorage.clear();
  this.mainRouter.navigate(['']);
}







//-------------Change password------------



oldPassword: string;
newPassword1: string;
newPassword2: string;


oldPasswordMessage: string;
newPassword1Message: string;
newPassword2Message: string;
notSameMessage: string;
changePasswordSuccess: boolean;
regexy2: string;
badOldPasswordMessage: string;
requiredRegex2Message: string;

changePassword(){
            
  this.oldPasswordMessage = null;
  this.newPassword1Message= null;
  this.newPassword2Message= null;
  this.notSameMessage= null;
  this.badOldPasswordMessage = null;
  
  
  this.requiredRegex2Message = null;
  this.changePasswordSuccess = false;
  

if(this.oldPassword == null || this.oldPassword == ''){
  this.oldPasswordMessage = "Polje za staru lozinku ne sme biti prazno";
}
if(this.newPassword1 == null|| this.newPassword1 == ''){
  this.newPassword1Message = "Polje za novu lozinku ne sme biti prazno";
}
if(this.newPassword2 == null|| this.newPassword2 == ''){
  this.newPassword2Message = "Polje za potvrdu nove lozinke ne sme biti prazno";
}







if(this.oldPassword == null || this.oldPassword == '' || this.newPassword1 == null|| this.newPassword1 == '' ||
this.newPassword2 == null|| this.newPassword2 == ''){
  return false;
}



  if(this.oldPassword != this.readerUser.password){
    this.badOldPasswordMessage = "Uneta stara lozinka nije tacna, molim pokusajte ponovo!"
    return false;
  }




     /* Proveriti sifru sa regexom*/
     let regexy2 = /^(.{0,7}|.{13,}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*|[^a-zA-Z].*)$/
     if(regexy2.test(this.newPassword1)){
       //nije u redu
       this.requiredRegex2Message = "Nova lozinka nije odgovarajuceg oblika! Mora imati minimalno 8 i maksimalno 12 karaktera, od toga bar jedno veliko slovo, jedan broj i jedan specijalni karakter i mora pocinjati slovom"
       return false;
     }



     if(this.newPassword1 != this.newPassword2){
      this.notSameMessage = "Unete lozinke se ne poklapaju, pokusajte ponovo!";
      return false;
    }



this.userService.changePassword(this.readerUser.username, this.newPassword1).subscribe(respObj=>{
 if(respObj['message'] == "ok"){


    /*Azuriranje lozinke u sesiji */
    this.readerUser.password = this.newPassword1;
    localStorage.setItem('loggedUser', JSON.stringify(this.readerUser));


    this.newPassword1 = null;
    this.oldPassword = null;
    this.newPassword2 = null;
    this.changePasswordSuccess = true;
    this.logOut();
 }
 else this.changePasswordSuccess = false;
})


return true;


}

//-----------------------ODGOVARANJE NA ZAHTEVE---------------
requestsToConfirm: Requests[];

acceptRequest(requestObjectFromCard){
  
  this.requestService.setStatus("prihvacen", requestObjectFromCard.username).
  subscribe(respObj=>{
    if(respObj['message'] == "ok"){
      /*
      this.requestsToConfirm.forEach(element => {
        if(element.username == requestObjectFromCard.username){
          requestObjectFromCard.processed = true;
        }
      });*/
      //dodajemo u bazu korisnika ako treba
      this.userService.insertUser(requestObjectFromCard.username, requestObjectFromCard.password, requestObjectFromCard.name, requestObjectFromCard.lastName, requestObjectFromCard.address, requestObjectFromCard.contact, requestObjectFromCard.email, requestObjectFromCard.type, requestObjectFromCard.picture, 'false').subscribe(respObj=>{
        if(respObj['message'] == "ok"){

        }
       })

      }

     
      requestObjectFromCard.processed = true;
      //window.location.reload();
  })
   }


refuseRequest(requestObjectFromCard){
  
  this.requestService.setStatus("nije prihvacen", requestObjectFromCard.username).
  subscribe(respObj=>{
    if(respObj['message'] == "ok"){
 requestObjectFromCard.processed = true;

    }
   })

}


//----------------------------------REGISTRACIJA KORISNIKA----------------------------------------------


/*-------------REGISTRATION PICTURE------------*/

picture: string
pictureAddingMessage: string
isSaved: boolean

addPicture(fileInput: any) {
  this.pictureAddingMessage = null;
  this.picture = null
  this.isSaved = false
  if (fileInput.target.files && fileInput.target.files[0]) {

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];

          const imgBase64Path = e.target.result;
          this.picture = imgBase64Path;
          this.isSaved = true;
          return true
        
      };
    };

    reader.readAsDataURL(fileInput.target.files[0]);
  }
}

picturePath() {
  return this.domSanitizer.bypassSecurityTrustUrl(this.picture)
}


/*-----------------Registration--------------*/

registerName: string;
registerLastName: string;
registerAddress: string;
registerContact: string;
registerEmail: string;
registerUsername: string;
registerPassword: string;
registerConfirmPassword: string;

registerNameMessage: string;
registerLastNameMessage: string;
registerAddressMessage: string;
registerContactMessage: string;
registerEmailMessage: string;
registerUsernameMessage: string;
registerPasswordMessage: string;
registerConfirmPasswordMessage: string;
requiredPictureMessage: string;
requiredRegexMessage: string;

emailAlreadyUsed: boolean = false;
usernameAlreadyUsed: boolean = false;
validationSuccess: boolean = false;









registration(){
    /*-----Provera svega zivog i nezivog--- */

    this.userService.checkUsername(this.registerUsername).
    subscribe((logginUser: User)=>{
      if(logginUser){
        this.usernameAlreadyUsed = true;
      }
      else{
        this.usernameAlreadyUsed = false;
      }
      
              this.userService.checkEmail(this.registerEmail).
            subscribe((logginUser: User)=>{
              if(logginUser){
                this.emailAlreadyUsed = true;
              }
              else{
                this.emailAlreadyUsed = false;
              }

              
    this.registerNameMessage = null;
    this.registerLastNameMessage= null;
    this.registerAddressMessage= null;
    this.registerContactMessage= null;
    this.registerEmailMessage= null;
    this.registerUsernameMessage=null;
    this.registerPasswordMessage= null;
    this.registerConfirmPasswordMessage= null;
    this.requiredPictureMessage = null;
    this.requiredRegexMessage = null;
    this.validationSuccess = false;
    

  if(this.registerName == null || this.registerName == ''){
    this.registerNameMessage = "Polje za ime ne sme biti prazno";
  }
  if(this.registerLastName == null|| this.registerLastName == ''){
    this.registerLastNameMessage = "Polje za prezime ne sme biti prazno";
  }
  if(this.registerAddress == null|| this.registerAddress == ''){
    this.registerAddressMessage = "Polje za adresu ne sme biti prazno"
  }
  if(this.registerContact == null|| this.registerContact == ''){
    this.registerContactMessage = "Polje za kontakt ne sme biti prazno"
  }
  if(this.registerEmail == null|| this.registerEmail == ''){
    this.registerEmailMessage = "Polje za email ne sme biti prazno"
  }
  if(this.registerUsername == null|| this.registerUsername == ''){
    this.registerUsernameMessage = "Polje za korisnicko ime ne sme biti prazno"
  }
  if(this.registerPassword == null|| this.registerPassword == ''){
    this.registerPasswordMessage = "Polje za lozinku ne sme biti prazno! "
  }
  if(this.registerConfirmPassword == null|| this.registerConfirmPassword == ''){
    this.registerConfirmPasswordMessage = "Polje za potvrdu lozinke ne sme biti prazno"
  }



  


  if(this.registerName == null || this.registerName == '' || this.registerLastName == null|| this.registerLastName == '' || this.registerAddress == null|| this.registerAddress == ''||
  this.registerContact == null|| this.registerContact == '' || this.registerEmail == null|| this.registerEmail == '' || this.registerUsername == null|| this.registerUsername == '' ||
  this.registerPassword == null|| this.registerPassword == '' || this.registerConfirmPassword == null|| this.registerConfirmPassword == ''){
    return false;
  }

   /* Proveriti sifru sa regexom*/
   let regexy = /^(.{0,7}|.{13,}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*|[^a-zA-Z].*)$/
   if(regexy.test(this.registerPassword)){
     //nije u redu
     this.requiredRegexMessage = "Lozinka nije odgovarajuceg oblika! Mora imati minimalno 8 i maksimalno 12 karaktera, od toga bar jedno veliko slovo, jedan broj i jedan specijalni karakter i mora pocinjati slovom"
     return false;
   }

   

  if(this.registerPassword != this.registerConfirmPassword){
    this.registerConfirmPasswordMessage = "Unete lozinke se ne poklapaju, pokusajte ponovo!";
    return false;
  }
  

  if(this.emailAlreadyUsed){
    //greska vec koriscen username
    
    this.registerEmailMessage="Greska, vec iskoriscen email, morate odabrati novi";
    return false;
  }

  if(this.usernameAlreadyUsed){
    //greska vec koriscen username
    this.registerUsernameMessage="Greska, vec iskorisceno korisnicko ime, morate odabrati novo";
    return false;
  }

  if(this.picture == null){this.picture = "data:image/png;base64,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"};

//Admin direktno dodaje korisnika

  this.userService.insertUser(this.registerUsername, this.registerPassword, this.registerName, this.registerLastName, this.registerAddress, this.registerContact, this.registerEmail, 'citalac', this.picture, "false").subscribe(respObj=>{
   if(respObj['message'] == "ok"){


      this.validationSuccess = true;
      this.registerName = null;
      this.registerLastName = null;
      this.registerAddress = null;
      this.registerContact = null;
      this.registerEmail = null;
      this.registerUsername = null;
      this.registerPassword = null;
      this.registerConfirmPassword = null;
      this.picture = null;
   }
   else this.validationSuccess = false;
  })
  
  return true;          
          })
    })
}




//-----------------------------------------OSNOVNA PRETRAGA----------------------------------------------------------


searchMessage = "";
  searchParam: string = "";
  searchParamAuthor: string = "";
  allBooksForSearch: Book[];
  searchResults: Book[] = [];

  
  doSearch() {
    this.searchResults = [];
    this.searchMessage = ""
    this.bookService.getAll().subscribe((data: Book[]) => {

      this.allBooksForSearch = data;


      this.allBooksForSearch.forEach(bookInAll => {
        bookInAll.writerString = "";
        bookInAll.writer.forEach(writerInBook => {
          bookInAll.writerString += writerInBook;
        })
      })
      let chosenAuthors: string[] = this.searchParamAuthor.split(",").map((item: string) => item.trim());

      let notToAdd = false;
      this.allBooksForSearch.forEach((book) =>{
        notToAdd = false
        chosenAuthors.forEach(element => {
          if(!(new RegExp(this.searchParam, 'i').test(book.title) && new RegExp(element, 'i').test(book.writerString))){
            notToAdd = true;
          }
        })
        if(notToAdd == false){
          this.searchResults.push(book);
        }
      }
       );

      if (this.searchResults.length == 0) this.searchMessage = "Nema rezultata pretrage."

    })
  }







  navigateToBookPage(idB) {

    this.bookService.getBookById(idB).subscribe((data) => {
      localStorage.setItem('bookInUse', JSON.stringify(data));
      this.mainRouter.navigate(['booksPage']);
    })
  }




  //-------------------------------------------------------AZURIRANJE I BRISANJE KORISNIKA------------------------------------------


allUsers : User[];
chosenUserUsername:string = null;
userInfoName: string;
userInfoLastName: string;
userInfoAddress: string;
userInfoContact: string;
userInfoEmail: string;
userInfoUsername: string;
userInfoPicture: string;
chosenUser: User;
chosenUserType = "";
userInfoChosenPicture: string;



userInfoOldUsername: string;

userInfoNameMessage: string;
userInfoLastNameMessage: string;
userInfoAddressMessage: string;
userInfoContactMessage: string;
userInfoEmailMessage: string;
userInfoUsernameMessage: string;
userInfoPasswordMessage: string;
userInfoConfirmPasswordMessage: string;
userInfoRequiredPictureMessage: string;
userInfoRequiredRegexMessage: string;

userInfoEmailAlreadyUsed: boolean = false;
userInfoUsernameAlreadyUsed: boolean = false;
userInfoValidationSuccess: boolean = false;





userInfoPictureAddingMessage: string
userInfoIsSaved: boolean

addUserInfoPicture(fileInput: any) {
  this.userInfoPictureAddingMessage = null;
  this.userInfoChosenPicture = null
  this.userInfoIsSaved = false
  if (fileInput.target.files && fileInput.target.files[0]) {

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];


          const imgBase64Path = e.target.result;
          this.userInfoChosenPicture = imgBase64Path;
          this.userInfoIsSaved = true;
          return true
      };
    };

    reader.readAsDataURL(fileInput.target.files[0]);
  }
}

userInfoPicturePath() {
  return this.domSanitizer.bypassSecurityTrustUrl(this.userInfoChosenPicture)
}



  showChosenUserInfo(){
    this.raiseOrLowerMessage = null;

    this.allUsers.forEach(element => {
      if(element.username == this.chosenUserUsername){
        this.chosenUser = element;
        this.chosenUserType = this.chosenUser.type;
        this.isBlocked = this.chosenUser.blocked;
      }
    });

this.userInfoName = this.chosenUser.name;
this.userInfoLastName = this.chosenUser.lastName;
this.userInfoAddress = this.chosenUser.address;
this.userInfoContact = this.chosenUser.contact;
this.userInfoEmail = this.chosenUser.email;
this.userInfoUsername = this.chosenUser.username;
this.userInfoPicture = this.chosenUser.picture;
this.userInfoOldUsername = this.chosenUser.username;
}


updateUserInfo(){
  /*-----Provera svega zivog i nezivog--- */

  this.userService.checkUsername(this.userInfoUsername).
  subscribe((logginUser: User)=>{
    if(logginUser){
      if(logginUser.username == this.userInfoUsername){
        this.userInfoUsernameAlreadyUsed = false; //izmenio neki svoj drugi podatak
      }
      else{
        this.userInfoUsernameAlreadyUsed = true;
      }
    }
    else{
      this.userInfoUsernameAlreadyUsed = false;
    }
    
            this.userService.checkEmail(this.userInfoEmail).
          subscribe((logginUser: User)=>{
            if(logginUser){
              if(logginUser.email == this.userInfoEmail){
                this.userInfoEmailAlreadyUsed = false; //izmenio neki svoj drugi podatak
              }
              else{
                this.userInfoEmailAlreadyUsed = true;
              }                
            }
            else{
              this.userInfoEmailAlreadyUsed = false;
            }

            
  this.userInfoNameMessage = null;
  this.userInfoLastNameMessage= null;
  this.userInfoAddressMessage= null;
  this.userInfoContactMessage= null;
  this.userInfoEmailMessage= null;
  this.userInfoUsernameMessage=null;
  this.userInfoPasswordMessage= null;
  this.userInfoConfirmPasswordMessage= null;
  this.userInfoRequiredPictureMessage = null;
  this.userInfoRequiredRegexMessage = null;
  this.userInfoValidationSuccess = false;

if(this.userInfoName == null || this.userInfoName == ''){
  this.userInfoNameMessage = "Polje za ime ne sme biti prazno";
}
if(this.userInfoLastName == null|| this.userInfoLastName == ''){
  this.userInfoLastNameMessage = "Polje za prezime ne sme biti prazno";
}
if(this.userInfoAddress == null|| this.userInfoAddress == ''){
  this.userInfoAddressMessage = "Polje za adresu ne sme biti prazno"
}
if(this.userInfoContact == null|| this.userInfoContact == ''){
  this.userInfoContactMessage = "Polje za kontakt ne sme biti prazno"
}
if(this.userInfoEmail == null|| this.userInfoEmail == ''){
  this.userInfoEmailMessage = "Polje za email ne sme biti prazno"
}
if(this.userInfoUsername == null|| this.userInfoUsername == ''){
  this.userInfoUsernameMessage = "Polje za korisnicko ime ne sme biti prazno"
}






if(this.userInfoName == null || this.userInfoName == '' || this.userInfoLastName == null|| this.userInfoLastName == '' || this.userInfoAddress == null|| this.userInfoAddress == ''||
this.userInfoContact == null|| this.userInfoContact == '' || this.userInfoEmail == null|| this.userInfoEmail == '' || this.userInfoUsername == null|| this.userInfoUsername == ''){
  return false;
}



if(this.userInfoEmailAlreadyUsed){
  //greska vec koriscen username
  
  this.userInfoEmailMessage="Greska, vec iskoriscen email, morate odabrati novi";
  return false;
}

if(this.userInfoUsernameAlreadyUsed){
  //greska vec koriscen username
  this.userInfoUsernameMessage="Greska, vec iskorisceno korisnicko ime, morate odabrati novo";
  return false;
}

if(this.userInfoChosenPicture == null){this.userInfoChosenPicture = this.userInfoPicture}



this.userService.updateInfo(this.userInfoUsername, this.userInfoName, this.userInfoLastName, this.userInfoAddress, this.userInfoContact, this.userInfoEmail, this.userInfoChosenPicture, this.userInfoOldUsername).subscribe(respObj=>{
 if(respObj['message'] == "ok"){
    

  this.chosenUser.name = this.userInfoName;
  this.chosenUser.lastName = this.userInfoLastName;
  this.chosenUser.address = this.userInfoAddress;
  this.chosenUser.contact = this.userInfoContact;
  this.chosenUser.email = this.userInfoEmail;
  this.chosenUser.username = this.userInfoUsername;
  this.chosenUser.picture= this.userInfoChosenPicture;


  this.allUsers.forEach(element => {
    if(element.username == this.userInfoOldUsername){
      element = this.chosenUser;
    }
  });





    this.userInfoPicture = this.userInfoChosenPicture;
    this.userInfoValidationSuccess = true;
 }
 else this.userInfoValidationSuccess = false;
})


return true;


          
        })



  })


}





//----------------------------------------------------------OBRISI KORISNIKA---------------------------------------------

errorUserHaveLoan: string;

deleteUser(){

  this.errorUserHaveLoan = null;

  this.loanService.getAll(this.chosenUser.username, false).subscribe((data: Loan[]) => {
    if(data.length != 0){
      this.errorUserHaveLoan = "Nije moguce izbrisati korisnika, ima zaduzenih knjiga koje nije vratio";
    }
    else{
      this.userService.deleteUser(this.chosenUser.username).subscribe(resp=>{
        if(resp['message'] == "ok"){
          this.userService.getAll().subscribe((data: User[]) => {
            this.allUsers = data;
  
  
            this.userInfoName = null;
            this.userInfoLastName = null;
            this.userInfoAddress = null;
            this.userInfoContact = null;
            this.userInfoEmail = null;
            this.userInfoUsername = null;
            this.userInfoPicture = null;
            this.userInfoOldUsername =null;
  
  
          })
        }
      })
    }
  })
}



//------------------------------------------------------PODIZANJE PRIVILEGIJA--------------------------------

raiseOrLowerMessage: string = null;

raisePrivilegies(){
  

  this.userService.changePrivilegies(this.chosenUser.username, 'moderator').subscribe(respObj=>{
    if(respObj['message'] == "ok"){
      this.raiseOrLowerMessage = ""
      this.raiseOrLowerMessage = "Uspesno ste podigli privilegije korisniku!"
      this.chosenUser.type = "moderator";
      this.chosenUserType = "moderator";
    }
  })
}

lowerPrivilegies(){
  this.userService.changePrivilegies(this.chosenUser.username, 'citalac').subscribe(respObj=>{
    if(respObj['message'] == "ok"){
      this.raiseOrLowerMessage = ""
      this.raiseOrLowerMessage = "Uspesno ste smanjili privilegije korisniku!"
      this.chosenUser.type = "citalac";
      this.chosenUserType = "citalac";
    }
  })
}



//-------------------------------------------AZURIRANJE BROJA DANA ZA VRACANJE KNJIGE--------------------------------------------------------

extendParametar: number;
messageUpdateExtend: string;
updateExtendDate(){
  this.messageUpdateExtend = null;
  this.sysVariableService.updateExtendPeriod(this.extendParametar).subscribe((helper)=>{
    if(helper['message'] == "ok"){
      this.messageUpdateExtend = "Uspesno azuriran broj dana!"
    }
  })
}


//----------------------------------------BLOKIRANJE I ODBLOKIRANJE KORISNIKA---------------------------------------

blockUnblockMessage: string = null;
isBlocked: boolean;
block(){
  this.blockUnblockMessage = ""
  this.userService.blockOrUnblock(this.chosenUser.username, true).subscribe(respObj=>{
    if(respObj['message'] == "ok"){
      
      this.blockUnblockMessage = "Uspesno ste blokirali korisnika!"
      this.isBlocked = true;
    }
  })
}

unblock(){
  this.blockUnblockMessage = ""
  this.userService.blockOrUnblock(this.chosenUser.username, false).subscribe(respObj=>{
    if(respObj['message'] == "ok"){
      
      this.blockUnblockMessage = "Uspesno ste odblokirali korisnika!"
      this.isBlocked = false;
    }
  })
}



genresList: string[] = ['fantasy', 'mistery','educational','crime','horror', 'realist novel', 'sci-fi', ];
//----------------------------------------------DODAVANJE NOVE KNJIGE-----------------------------------------

newBookPicture: string
newBookPictureAddingMessage: string
newBookIsSaved: boolean

newBookAddPicture(fileInput: any) {
  this.newBookPictureAddingMessage = null;
  this.newBookPicture = null
  this.newBookIsSaved = false
  if (fileInput.target.files && fileInput.target.files[0]) {


    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];
       
          const imgBase64Path = e.target.result;
          this.newBookPicture = imgBase64Path;
          this.newBookIsSaved = true;
          return true
          // this.previewImagePath = imgBase64Path;
      };
    };

    reader.readAsDataURL(fileInput.target.files[0]);
  }
}

newBookPicturePath() {
  return this.domSanitizer.bypassSecurityTrustUrl(this.newBookPicture)
}






newBookTitle: string;
newBookWriter: string;

newBookPublisher: string;
newBookPubYear: string;
newBookLanguage: string;
newBookArrayGenre: string[];

newBookTitleMessage: string;
newBookWriterMessage: string;
newBookGenreMessage: string;
newBookPublisherMessage: string;
newBookPubYearMessage: string;
newBookLanguageMessage: string;
newBookArrayGenreError: string;

newBookRequiredPictureMessage: string;

newBookValidationSuccess: boolean = false;



allBooksToGetId:Book[];

registerNewBook(){
    /*-----Provera svega zivog i nezivog--- */



    this.newBookTitleMessage = null;
    this.newBookWriterMessage= null;
    this.newBookGenreMessage= null;
    this.newBookPublisherMessage= null;
    this.newBookPubYearMessage= null;
    this.newBookLanguageMessage=null;
    this.newBookRequiredPictureMessage = null;
    this.newBookArrayGenreError = null;
  
    this.newBookValidationSuccess = false;

  
    

  if(this.newBookTitle == null || this.newBookTitle == ''){
    this.newBookTitleMessage = "Polje za naziv knjige ne sme biti prazno";
  }
  if(this.newBookWriter == null|| this.newBookWriter == ''){
    this.newBookWriterMessage = "Polje za pisca/pisce ne sme biti prazno";
  }
  if(this.newBookArrayGenre == null){
    this.newBookGenreMessage = "Polje za zanr ne sme biti prazno"
  }
  if(this.newBookPublisher == null|| this.newBookPublisher == ''){
    this.newBookPublisherMessage = "Polje za izdavaca ne sme biti prazno"
  }
  if(this.newBookPubYear == null|| this.newBookPubYear == ''){
    this.newBookPubYearMessage = "Polje za godinu izdanja ne sme biti prazno"
  }
  if(this.newBookLanguage == null|| this.newBookLanguage == ''){
    this.newBookLanguageMessage = "Polje za jezik ne sme biti prazno"
  }

  if(this.newBookArrayGenre.length > 3){
    this.newBookArrayGenreError = "Ne smete uneti vise od tri zanra, pokusajte ponovo!";
    return false;
  }

  


  if(this.newBookTitle == null || this.newBookTitle == '' || this.newBookWriter == null|| this.newBookWriter == '' || this.newBookArrayGenre == null||
  this.newBookPublisher == null|| this.newBookPublisher == '' || this.newBookPubYear == null|| this.newBookPubYear == '' || this.newBookLanguage == null|| this.newBookLanguage == ''){
    return false;
  }

  
   

  if(this.newBookPicture == null){this.newBookPicture = "data:image/png;base64,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"};



/* INSERT BOOK

  this.bookService.insertRequest(this.registerUsername, this.registerPassword, this.registerName, this.registerLastName, this.registerAddress, this.registerContact, this.registerEmail, 'citalac', this.picture, 'na cekanju').subscribe(respObj=>{
   if(respObj['message'] == "ok"){
      this.validationSuccess = true;
      this.registerName = null;
      this.registerLastName = null;
      this.registerAddress = null;
      this.registerContact = null;
      this.registerEmail = null;
      this.registerUsername = null;
      this.registerPassword = null;
      this.registerConfirmPassword = null;
      this.picture = null;
   }
   else this.validationSuccess = false;
  })
  
*/
  


  //uzmi novi idBook

  this.bookService.getAll().subscribe((respObj : Book[])=>{
    this.allBooksToGetId = respObj;
   this.sortById();
   let newId;
   if(this.allBooksToGetId == null || this.allBooksToGetId.length == 0){
    newId = 1;
   }else{
    newId = this.allBooksToGetId[0].idBook + 1;
   }
   



   /* INSERT BOOK*/

   this.bookService.insertBook(newId, this.newBookTitle, this.newBookWriter, this.newBookArrayGenre, this.newBookPublisher, this.newBookPubYear, this.newBookLanguage, this.newBookPicture).subscribe(respObj=>{
    if(respObj['message'] == "ok"){
       this.newBookValidationSuccess = true;
       this.newBookTitle = null;
       this.newBookWriter = null;
       this.newBookArrayGenre = null;
       this.newBookPublisher = null;
       this.newBookPubYear = null;
       this.newBookLanguage = null;
       this.newBookArrayGenreError = null;
       this.newBookPictureAddingMessage = null;
       this.newBookPicture = null;
    }
    else this.newBookValidationSuccess = false;
   })

    
   })
  






  return true;

}



sortById(){
  this.allBooksToGetId = this.allBooksToGetId.sort((book1,book2)=>{
    if(book1.idBook > book2.idBook){
      return -1;
    }
    else{
      if(book1.idBook == book2.idBook){
        return 0;

      }
      else{
        return 1;
      }
    }
  });
}


}






