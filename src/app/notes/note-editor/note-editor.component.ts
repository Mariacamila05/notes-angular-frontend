import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  isNew = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private readonly notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [''],
      description: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
       id!== 'new'? this.isNew = false : this.isNew = true;
           if (id !== 'new') {
        this.notesService.getNoteById(id!).then((res: any) => {
          const { title, description } = res;
          this.editForm = this.fb.group({
            title: [title],
            description: [description],
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const { title, description } = this.editForm.value;

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id === 'new') {
        this.notesService
          .createNotes({ title, description })
          .then((res: any) => {
            this.router.navigate(['/notes']);
          });
        return;
      }

      this.notesService
        .updateNotes(id!, { title, description })
        .then((res: any) => {
          this.router.navigate(['/notes']);
        });
    });
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }
}
