import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})
export class NotesCreateComponent implements OnInit {
  createForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private readonly notesService: NotesService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      return;
    }

    const { title, description } = this.createForm.value;

    this.notesService.createNotes({ title, description }).then((res: any) => {
      this.router.navigate(['/notes']);
    });


  }

}
