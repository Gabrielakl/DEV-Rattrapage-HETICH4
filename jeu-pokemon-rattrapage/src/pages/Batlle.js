import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import axios from 'axios';

function Battle() {
    const [team, setTeam] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [enemyPokemon, setEnemyPokemon] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3001/pokemon', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'équipe', error);
            });

        generateEnemyPokemon(token, setEnemyPokemon);
    }, []);

    useEffect(() => {
        if (team.length === 0 || !enemyPokemon) return;

        const config = {
            type: Phaser.AUTO,
            width: 1200,
            height: 800,
            backgroundColor: '#D6B3FF',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            }
        };

        const game = new Phaser.Game(config);

        function preload() {
            this.load.image('background', 'assets/background.png');
            team.forEach(pokemon => {
                this.load.image(pokemon.basePokemon.name, pokemon.basePokemon.sprite);
            });
            this.load.image('enemy', enemyPokemon.sprite);
        }

        function create() {
            this.add.image(400, 300, 'background');

            this.player1 = {
                sprite: this.add.sprite(200, 300, team[currentPlayerIndex].basePokemon.name).setScale(1.5),
                hp: team[currentPlayerIndex].health,
                maxHp: team[currentPlayerIndex].health,
                technics: team[currentPlayerIndex].basePokemon.technics,
            };

            this.player2 = {
                sprite: this.add.sprite(600, 300, 'enemy').setScale(1.5),
                hp: enemyPokemon.health,
                maxHp: enemyPokemon.health,
                technics: enemyPokemon.technics,
            };

            this.player1HpText = this.add.text(50, 50, `HP: ${this.player1.hp} / ${this.player1.maxHp}`, { fontSize: '20px', fill: '#fff' });
            this.player2HpText = this.add.text(550, 50, `HP: ${this.player2.hp} / ${this.player2.maxHp}`, { fontSize: '20px', fill: '#fff' });

            this.actionText = this.add.text(200, 400, '', { fontSize: '20px', fill: '#fff' });

            this.currentTurn = 'player1';

            this.showAttackOptions = showAttackOptions.bind(this);
            this.handlePlayerAttack = handlePlayerAttack.bind(this);
            this.handleEnemyTurn = handleEnemyTurn.bind(this);
            this.handleVictory = handleVictory.bind(this);
            this.handleDefeat = handleDefeat.bind(this);
            this.switchToNextPokemon = switchToNextPokemon.bind(this);

            this.showAttackOptions();
        }

        function showAttackOptions() {
            const technics = this.player1.technics;
            let yPosition = 500;
            technics.forEach((tech, index) => {
                const attackButton = this.add.text(100, yPosition, tech.name, { fontSize: '20px', fill: '#fff' })
                    .setInteractive()
                    .on('pointerdown', () => {
                        this.handlePlayerAttack(index);
                    });
                yPosition += 30;
            });
        }

        function handlePlayerAttack(techIndex) {
            const damage = this.player1.technics[techIndex].attack;
            this.player2.hp -= damage;
            this.actionText.setText(`${this.player1.technics[techIndex].name} inflige ${damage} points de dégâts à l'ennemi !`);
            this.player2HpText.setText(`HP: ${this.player2.hp} / ${this.player2.maxHp}`);

            if (this.player2.hp <= 0) {
                this.handleVictory();
            } else {
                this.handleEnemyTurn();
            }
        }

        function handleEnemyTurn() {
            const randomTechIndex = Phaser.Math.Between(0, this.player2.technics.length - 1);
            const damage = this.player2.technics[randomTechIndex].attack;
            this.player1.hp -= damage;
            this.actionText.setText(`L'ennemi attaque avec ${this.player2.technics[randomTechIndex].name}, infligeant ${damage} points de dégâts !`);
            this.player1HpText.setText(`HP: ${this.player1.hp} / ${this.player1.maxHp}`);

            if (this.player1.hp <= 0) {
                if (currentPlayerIndex + 1 < team.length) {
                    this.switchToNextPokemon();
                } else {
                    this.handleDefeat();
                }
            } else {
                this.currentTurn = 'player1';
                this.showAttackOptions();
            }
        }

        function switchToNextPokemon() {
            this.currentTurn = 'player1';
            this.actionText.setText("Votre Pokémon est KO ! Un nouveau Pokémon entre en scène !");
            setCurrentPlayerIndex(prevIndex => prevIndex + 1);

            this.time.delayedCall(2000, () => {
                const nextPokemon = team[currentPlayerIndex + 1];
                this.player1.sprite.setTexture(nextPokemon.basePokemon.name);
                this.player1.hp = nextPokemon.health;
                this.player1.maxHp = nextPokemon.health;
                this.player1.technics = nextPokemon.basePokemon.technics;
                this.player1HpText.setText(`HP: ${this.player1.hp} / ${this.player1.maxHp}`);
                this.showAttackOptions();
            }, [], this);
        }

        function handleVictory() {
            this.actionText.setText("Vous avez gagné le combat !");
            this.time.delayedCall(2000, async () => {
                this.actionText.setText("Un nouvel ennemi apparaît !");
                generateEnemyPokemon(localStorage.getItem('token'), (newEnemy) => {
                    this.player2.sprite.setTexture('newEnemy');  // Mettre à jour le sprite du nouvel ennemi
                    this.player2.hp = newEnemy.health;
                    this.player2.maxHp = newEnemy.health;
                    this.player2.technics = newEnemy.technics;
                    this.player2HpText.setText(`HP: ${this.player2.hp} / ${this.player2.maxHp}`);
                });
            }, [], this);
        }

        function handleDefeat() {
            this.actionText.setText("Vous avez perdu le combat !");
            // Ajouter ici la logique pour gérer la défaite
        }

        function update() {
            // Logique supplémentaire si nécessaire
        }

        return () => {
            game.destroy(true);
        };
    }, [team, enemyPokemon, currentPlayerIndex]);

    return <div id="phaser-container" />;
}

function generateEnemyPokemon(token, setEnemyPokemon) {
    axios.get('http://localhost:3001/base-pokemons/random', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            setEnemyPokemon(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du nouveau Pokémon ennemi', error);
        });
}

export default Battle;
