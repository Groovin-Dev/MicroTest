import express, { Request, Response } from "express";
import axios from "axios";

export default class ThreatService {
	heroService: string;

	constructor(heroService: string) {
		this.heroService = heroService;
	}

	threats = [
		{
			id: 1,
			displayName: "Pisa tower is about to collapse.",
			necessaryPowers: ["flying"],
			img: "tower.jpg",
			assignedHero: 0,
		},
		{
			id: 2,
			displayName: "Engineer is going to clean up server-room.",
			necessaryPowers: ["teleporting"],
			img: "mess.jpg",
			assignedHero: 0,
		},
		{
			id: 3,
			displayName: "John will not understand the joke",
			necessaryPowers: ["clairvoyance"],
			img: "joke.jpg",
			assignedHero: 0,
		},
	];

	app = express();

	public Initilize() {
		this.app.use(express.json());

		this.app.get("/threats", (req: Request, res: Response) => {
			console.log("GET /threats");
			res.json({ threats: this.threats });
		});

		this.app.post("/assignment", async (req: Request, res: Response) => {
			console.log("POST /assignment");

			try {
				const hRes = await axios.post(`${this.heroService}/hero/${req.body.heroId}`, { attributes: { busy: true } });

				const threatId = +req.body.threatId;
				const threat = this.threats.find((t) => t.id === threatId);

				if (!threat) {
					throw new Error("Threat not found");
				}

				threat.assignedHero = +hRes.data.id;

				res.json(threat);
			} catch (e) {
				res.status(400).json({ error: e.message });
			}
		});

		this.start();
	}

	private start() {
		this.app.listen(8081, () => {
			console.log("Threat service started");
		});
	}
}
