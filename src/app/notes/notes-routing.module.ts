import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'editor/:id',
    component: NoteEditorComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
