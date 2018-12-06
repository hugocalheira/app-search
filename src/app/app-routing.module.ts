import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsComponent } from './search/search-results/search-results.component';

const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  // { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'search', component: SearchResultsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'search' },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
