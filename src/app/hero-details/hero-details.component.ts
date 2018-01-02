import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../service/hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero;
  constructor(private activeRoute: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
  }
  getHero(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    console.log(this.hero);
  }
  goBack() {
    this.location.back();
  }

}
