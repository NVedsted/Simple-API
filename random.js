import { Router } from "express";
import { z } from "zod";

const randomRouter = Router();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function pickRandom(array) {
  return array[randomNumber(0, array.length)];
}

randomRouter.get("/number", (req, res) => {
  const { min = 0, max = 100 } = req.query;

  res.json(randomNumber(min, max));
});

randomRouter.get("/coin", (req, res) => {
  res.send(pickRandom(["Heads", "Tails"]));
});

randomRouter.post("/pick", (req, res) => {
  const choices = z.array(z.string()).parse(req.body);
  res.send(pickRandom(choices));
});

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

randomRouter.get("/color", (req, res) => {
  const r = randomNumber(0, 256);
  const g = randomNumber(0, 256);
  const b = randomNumber(0, 256);
  res.json({ r, g, b, hex: rgbToHex(r, g, b) });
});

export default randomRouter;
