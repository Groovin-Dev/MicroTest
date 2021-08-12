import HeroService from "./services/hero";
import ThreatService from "./services/threat";

const hs = new HeroService();
hs.Initilize();

const vs = new ThreatService(hs.getConnection());
vs.Initilize();
