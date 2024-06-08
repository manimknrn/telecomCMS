import { Component } from '@angular/core';
import { MAIN_MENU } from '../../models/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MatToolbarModule, MatDivider],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Telecom CMS';
  menuList = MAIN_MENU;
  constructor() {

  }
}
