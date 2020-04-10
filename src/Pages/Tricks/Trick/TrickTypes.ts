export type LibraryTrick = {
	id: number;
	name: string;
	videoUrl: string;
};

export type UserLibraryTrick = LibraryTrick & { addedToMyTricks: boolean };
export type MyTrick = LibraryTrick;
