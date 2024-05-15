import { Routes } from '@angular/router';
import { SignInComponent } from './views/account/sign-in/sign-in.component'
import { SignUpComponent } from './views/account/sign-up/sign-up.component'
import { MyProfileComponent } from './views/account/my-profile/my-profile.component'
import { HomeComponent } from './views/app/home/home.component'
import { HelpComponent } from './views/app/help/help.component'
import { ProductCreateComponent } from './views/app/product/product-create/product-create.component'
import { ProductListComponent } from './views/app/product/product-list/product-list.component'
import { ProductEditComponent } from './views/app/product/product-edit/product-edit.component'
import { ProductDetailComponent } from './views/app/product/product-detail/product-detail.component'
import { NotFoundComponent } from './views/not-found/not-found.component'
import { MainComponent } from './views/app/main/main.component'

export const routes: Routes = [
   {
     path: 'account/sign-in',
     component: SignInComponent,

   },
   {
    path: 'account/sign-up',
    component: SignUpComponent,

   },
   {
    path: '',
    component: HomeComponent,

   },
   {
     path: 'main',
     component: MainComponent,

   },
   {
    path: 'help',
    component: HelpComponent,

   },
   {
    path: 'account/my-profile',
    component: MyProfileComponent,

   },
   {
     path: 'product/create',
     component: ProductCreateComponent,

   },
   {
     path: 'product/list',
     component: ProductListComponent,

   },
   {
    path: 'product/edit',
    component: ProductEditComponent,

   },
   {
    path: 'product/detail',
    component: ProductDetailComponent,

   },
   {
    path: '**',
    component: NotFoundComponent,

   }


];
