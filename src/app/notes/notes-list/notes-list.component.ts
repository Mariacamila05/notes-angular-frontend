import { Component } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  notes: any[] = [];

  constructor(
    private readonly notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.notesService
      .getNotes()
      .then((res: any) => {
        this.notes = res;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  delete(id: string) {
    this.notesService.deleteNote(id).then((res: any) => {
      this.notes = this.notes.filter((note) => note.id !== id);
    });
  }
}
