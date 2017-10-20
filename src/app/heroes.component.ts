import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HEROES } from "./mock-heroes";
import { HeroService } from "./hero.service";

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[] = HEROES;

  constructor(
    private heroService: HeroService,
    private router: Router){

    }

  getHeroes(){
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit() : void {
    this.getHeroes();
  }

  gotoDetail(){
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
