import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  public moment!: Moment;
  public btnText = "Edit";
  constructor(
    private momentService: MomentService,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(item => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData;

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.upDateMoment(id!, formData).subscribe(item => {
      this.messagesService.add(`Moment ${id} foi atualizado com sucesso!`);
      this.router.navigate(['/']);
    });
  }

}
