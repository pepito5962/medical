export class Patient {
  constructor(
    public nom: string,
    public prenom: string,
    public age: number,
    public medecinTraitant: number,
    public status: string,
    public ville: string
  ) {}
}
