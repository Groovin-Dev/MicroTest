import express, { Request, Response } from "express";

export default class HeroService {
	powers = [
		{ id: 1, name: "flying" },
		{ id: 2, name: "teleporting" },
		{ id: 3, name: "super strength" },
		{ id: 4, name: "clairvoyance" },
		{ id: 5, name: "mind reading" },
	];

	heroes = [
		{
			id: 1,
			type: "spider-dog",
			displayName: "Cooper",
			powers: [1, 4],
			img: "cooper.jpg",
			busy: false,
		},
		{
			id: 2,
			type: "flying-dogs",
			displayName: "Jack & Buddy",
			powers: [2, 5],
			img: "jack_buddy.jpg",
			busy: false,
		},
		{
			id: 3,
			type: "dark-light-side",
			displayName: "Max & Charlie",
			powers: [3, 2],
			img: "max_charlie.jpg",
			busy: false,
		},
		{
			id: 4,
			type: "captain-dog",
			displayName: "Rocky",
			powers: [1, 5],
			img: "rocky.jpg",
			busy: false,
		},
	];

	app = express();

	public Initilize() {
		this.app.use(express.json());

		this.app.get("/heroes", (req: Request, res: Response) => {
			console.log(`GET /heroes`);
			res.json({ heroes: this.heroes });
		});

		this.app.get("/powers", (req: Request, res: Response) => {
			console.log(`GET /powers`);
			res.json({ powers: this.powers });
		});

		this.app.post("/hero/:id", (req: Request, res: Response) => {
			console.log(`POST /hero/${req.params.id}`);

			const heroId = +req.params.id;
			const hero = this.heroes.find((h) => h.id === heroId);

			if (hero) {
				for (let attr in req.body.attributes) {
					if (hero.hasOwnProperty(attr)) {
						//@ts-ignore
						hero[attr] = req.body.attributes[attr];
					}
				}

				return res.json(hero);
			}

			res.status(404).json({ error: "Hero not found" });
		});

		this.start();
	}

	private start() {
		this.app.listen(8080, () => {
			console.log("Hero service started");
		});
	}

	public getConnection() {
		// This is garbage
		return "http://localhost:8080";
	}
}
