import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Observable, empty, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from './curso';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];

  // bsModalRef: BsModalRef;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService,
    // private modalService: BsModalService
    private alertService: AlertModalService
  ) { }

  ngOnInit() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados );
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
      /*map(),
      tap(),
      switchMap(), o cachtError deve ser sempre o ultimo para poder capturar qualquer tipo de erro*/
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    // this.service.list()
    // .pipe(
    //   catchError(error => empty())
    // )
    // .subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => console.error(error),
    //   () => console.log('Observable completo!')
    // );
  }

  handleError() {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');

  }

}
