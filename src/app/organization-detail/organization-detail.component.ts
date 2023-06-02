import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Organization } from '../organization';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})

export class OrganizationDetailComponent implements OnInit {
  organization: Organization | undefined;
  updatedName: string = '';

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrganization();
  }

  getOrganization(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organizationService.getOrganization(id)
      .subscribe(organization => this.organization = organization);
  }

  goBack(): void {
    this.router.navigate([''], { queryParams: { refresh: 'true' } });
  }

  save(): void {
    if (this.organization && this.updatedName) {
      this.organization.name = this.updatedName;
      this.organizationService.updateOrganization(this.organization.id, this.organization)
        .subscribe(() => this.goBack());
    }
  }

}
