import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../_models';

const users: User[] = [
    { id: 1, email: 'test@email.com', password: '!23Ticket@', firstName: 'Test', profile: 'access', lastName: 'User ' },
    { id: 2, email: 'test1@email.com', password: '!23Ticket@', firstName: 'Test 1', profile: 'access1', lastName: 'User 1' },
    { id: 3, email: 'test2@email.com', password: '!23Ticket@', firstName: 'Test 2', profile: 'access2', lastName: 'User 2' },
    { id: 4, email: 'test3@email.com', password: '!23Ticket@', firstName: 'Test 3', profile: 'access3', lastName: 'User 3' }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

      //  agrupar observable atrasado para simular a chamada da API do servidor
        return of(null)
            .pipe(mergeMap(handleRoute))
        .pipe(materialize()) //  chamada materialize e desmaterialize para garantir atraso, mesmo se um erro for gerado(https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    // passar por quaisquer solicitações não tratadas acima
                    return next.handle(request);
            }
        }

        // route

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('email or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                profile: user.profile,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }



        // helper

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
  //   usar back- end falso no lugar do serviço Http para desenvolvimento sem back - end
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
