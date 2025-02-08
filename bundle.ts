import { bundle } from 'https://deno.land/x/emit@0.40.0/mod.ts';

const infile = Deno.args[0];
const outfile = Deno.args[1];

const url = new URL(import.meta.resolve(infile));
const { code } = await bundle(url);

Deno.writeTextFile(outfile, code);
