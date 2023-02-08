import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Coments';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  public moment?: Moment;
  public commentForm!: FormGroup;
  public baseApiUrl = environment.baseApiUrl;
  public faTimes = faTimes;
  public faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private commentService: CommentService
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMoment(id);
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    })
  }
  get text() {
    return this.commentForm.get('text')!;
  }
  get username() {
    return this.commentForm.get('username')!;
  }

  getMoment(id: number) {
    this.momentService.getMoment(id)
      .subscribe(item => {
        this.moment = item.data;
      });
  };

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messagesService.add("Momento excluído com sucesso!");
    this.router.navigate(['/']);
  }
  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return
    }
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment?.id);

    await this.commentService.createComment(data).subscribe((comment) => {
      this.moment?.comments?.push(comment.data)
    });
    this.messagesService.add("Comentário adcionado");
    //reseta o form
    this.commentForm.reset();
    formDirective.resetForm();
  }
}
