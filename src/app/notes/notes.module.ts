import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesRoutingModule } from './notes-routing.module';

@NgModule({
  declarations: [NoteEditorComponent, NotesListComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
        ],
      },
    }),
  ],
  exports: [NoteEditorComponent, NotesListComponent],
})
export class NotesModule {}
