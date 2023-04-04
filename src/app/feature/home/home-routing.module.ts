import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home.component";
import { MainLayoutComponent } from "@core/main-layout/main-layout.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }