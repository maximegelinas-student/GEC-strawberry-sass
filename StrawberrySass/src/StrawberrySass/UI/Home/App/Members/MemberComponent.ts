﻿import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Member } from './Member';
import { MemberService } from './MemberService';

@Component({
    moduleId: module.id,
    selector: 'app-member',
    templateUrl: '/templates/home/member'
})
export class MemberComponent implements OnInit {

    member: Member;

    constructor(
        private _memberService: MemberService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._route.params.forEach((params: Params) => {
            const key = params['key'];

            this._memberService.get(key).subscribe(
                (member: Member) => this.member = member,
                () => console.log('GET Member fail...')
            );
        });
    }

    getRoleName(role: { string: boolean }): string {
        return Object.keys(role)[0];
    }

    getRoleValue(role: { string: boolean }): boolean {
        return role[Object.keys(role)[0]];
    }

    onMemberRoleChange(role: { string: boolean }, event: any): void {
        this.setRoleValue(this.getRoleName(role), event.checked);
        console.log('roles', this.member.roles);
    }

    onSubmit(): void {
        this._memberService.update(this.member).subscribe(
            () => this._router.navigate(['/members']),
            () => console.log('UPDATE Member fail...')
        );
    }

    setRoleValue(roleName: string, value: boolean) {
        this.member.roles.map((role: any) => {
            if (this.getRoleName(role) === roleName) {
                role[roleName] = value;
            }
        });
    }

}