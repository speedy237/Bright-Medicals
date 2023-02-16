import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import { HomeComponent } from './app/components/home/home.component';
import { SignInComponent } from './app/components/sign-in/sign-in.component';
import { SignUpComponent } from './app/components/sign-up/sign-up.component';
import { LungComponent } from './app/components/lung/lung.component';
import { BrainComponent } from './app/components/brain/brain.component';


const routes:Routes=[
  {path:'home/:id',component:HomeComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'lung/:id',component:LungComponent},
  {path:'brain/:id',component:BrainComponent},
  {path:'',redirectTo:'/sign-in',pathMatch:'full'}

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
