import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';
  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
  ) {

  }
  async createHandler(moment: Moment) {
    const formData = new FormData;
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if (moment.image) {
      formData.append('image', moment.image);
    }


    await this.momentService.creatMoment(formData).subscribe();

    this.messageService.add('Momento adcionado com sucesso!');

    this.router.navigate(['/']);
  }
}
