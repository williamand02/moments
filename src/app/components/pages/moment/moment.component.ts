import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

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
    private messagesService: MessagesService
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getMoment(id);
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
  onSubmit() { }
}
