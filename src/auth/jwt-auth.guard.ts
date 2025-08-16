import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authorization = request.headers.authorization;
            const token = authorization.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException('Пользователь не авторизован');
            }

            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        } catch {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'});
        }
    }
}