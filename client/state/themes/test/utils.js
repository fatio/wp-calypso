/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	normalizeWpcomTheme,
	getThemeIdFromStylesheet,
	getNormalizedThemesQuery,
	getSerializedThemesQuery,
	getDeserializedThemesQueryDetails,
	getSerializedThemesQueryWithoutPage,
} from '../utils';

describe( 'utils', () => {
	describe( '#normalizeWpcomTheme()', () => {
		it( 'should return an empty object when given no argument', () => {
			const normalizedTheme = normalizeWpcomTheme();
			expect( normalizedTheme ).to.deep.equal( {} );
		} );
		it( 'should rename some keys', () => {
			const normalizedTheme = normalizeWpcomTheme( {
				id: 'mood',
				name: 'Mood',
				author: 'Automattic',
				description: 'Mood is a business theme with positive vibe...',
				description_long: '<p>Say hello to <em>Mood</em>, a business theme with a positive vibe...',
				support_documentation: '<h2>Getting started</h2>↵<p>When you first activate <em>Mood</em>,...',
				screenshot: 'mood.jpg',
				price: '$20',
				stylesheet: 'premium/mood',
				demo_uri: 'https://mooddemo.wordpress.com/',
				author_uri: 'https://wordpress.com/themes/'
			} );
			expect( normalizedTheme ).to.deep.equal( {
				id: 'mood',
				name: 'Mood',
				author: 'Automattic',
				description: 'Mood is a business theme with positive vibe...',
				descriptionLong: '<p>Say hello to <em>Mood</em>, a business theme with a positive vibe...',
				supportDocumentation: '<h2>Getting started</h2>↵<p>When you first activate <em>Mood</em>,...',
				screenshot: 'mood.jpg',
				price: '$20',
				stylesheet: 'premium/mood',
				demo_uri: 'https://mooddemo.wordpress.com/',
				author_uri: 'https://wordpress.com/themes/'
			} );
		} );
	} );

	describe( '#getThemeIdFromStylesheet()', () => {
		it( 'should return undefined when given no argument', () => {
			const themeId = getThemeIdFromStylesheet();
			expect( themeId ).to.be.undefined;
		} );

		it( 'should return the argument if it doesn\'t contain a slash (/)', () => {
			const themeId = getThemeIdFromStylesheet( 'twentysixteen' );
			expect( themeId ).to.equal( 'twentysixteen' );
		} );

		it( 'should return argument\'s part after the slash if it does contain a slash (/)', () => {
			const themeId = getThemeIdFromStylesheet( 'pub/twentysixteen' );
			expect( themeId ).to.equal( 'twentysixteen' );
		} );
	} );

	describe( '#getNormalizedThemesQuery()', () => {
		it( 'should exclude default values', () => {
			const query = getNormalizedThemesQuery( {
				page: 4,
				number: 20
			} );

			expect( query ).to.eql( {
				page: 4
			} );
		} );
	} );

	describe( '#getSerializedThemesQuery()', () => {
		it( 'should return a JSON string of a normalized query', () => {
			const serializedQuery = getSerializedThemesQuery( {
				type: 'page',
				page: 1
			} );

			expect( serializedQuery ).to.equal( '{"type":"page"}' );
		} );

		it( 'should prefix site ID if specified', () => {
			const serializedQuery = getSerializedThemesQuery( {
				search: 'Hello'
			}, 2916284 );

			expect( serializedQuery ).to.equal( '2916284:{"search":"Hello"}' );
		} );
	} );

	describe( 'getDeserializedThemesQueryDetails()', () => {
		it( 'should return undefined query and site if string does not contain JSON', () => {
			const queryDetails = getDeserializedThemesQueryDetails( 'bad' );

			expect( queryDetails ).to.eql( {
				siteId: undefined,
				query: undefined
			} );
		} );

		it( 'should return query but not site if string does not contain site prefix', () => {
			const queryDetails = getDeserializedThemesQueryDetails( '{"search":"hello"}' );

			expect( queryDetails ).to.eql( {
				siteId: undefined,
				query: { search: 'hello' }
			} );
		} );

		it( 'should return query and site if string contains site prefix and JSON', () => {
			const queryDetails = getDeserializedThemesQueryDetails( '2916284:{"search":"hello"}' );

			expect( queryDetails ).to.eql( {
				siteId: 2916284,
				query: { search: 'hello' }
			} );
		} );
	} );

	describe( '#getSerializedThemesQueryWithoutPage()', () => {
		it( 'should return a JSON string of a normalized query omitting page', () => {
			const serializedQuery = getSerializedThemesQueryWithoutPage( {
				type: 'page',
				page: 2
			} );

			expect( serializedQuery ).to.equal( '{"type":"page"}' );
		} );

		it( 'should prefix site ID if specified', () => {
			const serializedQuery = getSerializedThemesQueryWithoutPage( {
				search: 'Hello',
				page: 2
			}, 2916284 );

			expect( serializedQuery ).to.equal( '2916284:{"search":"Hello"}' );
		} );
	} );
} );
