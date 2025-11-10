import { Component } from '@angular/core';
import { LokasiPerumahan } from '../lokasi-perumahan/lokasi-perumahan';

@Component({
  selector: 'app-home',
  //apapun yg mau dipake, import harus diisi, jika diperlukan pada halaman tersebut
  imports: [LokasiPerumahan],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  numbers = [1, 2, 3, 4, 5];
}
