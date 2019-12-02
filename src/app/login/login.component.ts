import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.sass']
  })


export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        // Redireciona para home se estiver logado
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
      config.backdrop = 'static';
      config.keyboard = false;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
              Validators.required, Validators.minLength(8),
              Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]
            ]
        });

      //  obter URL de retorno a partir dos parâmetros da rota ou padrão para'/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Facilita acesso aos campos do formulário
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // Para se o formulário for inválido
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.modalService.dismissAll();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }


  open(content) {
    this.modalService.open(content);
  }
}
