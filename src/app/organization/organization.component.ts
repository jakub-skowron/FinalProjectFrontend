import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization';
import { OrganizationService } from '../organization.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  organizations: Organization[] = [];
  newOrganization: Organization = new Organization(0, '');
  errorMessage: string | undefined;
  isErrorMessageVisible: boolean = false;

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  loadOrganizations(): void {
    this.organizationService.getOrganizations().subscribe((list: Organization[]) => {
      this.organizations = list;
    });
  }

  handleErrorResponse(error: any): void {
    this.errorMessage = error.message;
  }

  createOrganization(): void {
    this.organizationService.addOrganization(this.newOrganization).subscribe(
      () => {
        this.loadOrganizations();
        this.resetForm();
      },
      (error) => {
        if (error.status && error.statusText) {
          this.errorMessage = `${error.error}`;
        } else {
          this.errorMessage = 'An error occurred.';
        }
        this.showErrorMessage();
        this.hideErrorMessageAfterDelay(2200);
      }
    );
  }

  hideErrorMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.hideErrorMessage();
    }, delay);
  }

  deleteOrganization(id: number) {
    this.organizationService.deleteOrganization(id).subscribe(() => {
      this.loadOrganizations();
    });
  }

  resetForm(): void {
    this.newOrganization = new Organization(0, '');
  }

  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((list: Organization[]) => {
      this.organizations = list;
      const refresh = this.route.snapshot.queryParamMap.get('refresh');

      if (refresh === 'true') {
        window.location.reload();
      }
    });
  }

  redirectToDetailsPage(id: number): void {
    this.router.navigate(['/organizations/' + id]);
  }

  showErrorMessage(): void {
    this.isErrorMessageVisible = true;
  }

  hideErrorMessage(): void {
    this.isErrorMessageVisible = false;
  }
}