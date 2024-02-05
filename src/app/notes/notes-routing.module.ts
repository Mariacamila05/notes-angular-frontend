import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesCreateComponent } from './notes-create/notes-create.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NotesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: NotesCreateComponent,
  },
  {
    path: 'edit/:id',
    component: NoteDetailComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
