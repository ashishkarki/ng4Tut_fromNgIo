import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //@Input() 
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    /*
    * switchMap operator maps the id in the Observable route parameters to a new Observable, 
    * the result of the HeroService.getHero() method.
    */
    this.route.paramMap.switchMap(
      (params) => this.heroService.getHero(+params.get('id'))
    )
      .subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}