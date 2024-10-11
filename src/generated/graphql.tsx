import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: number; output: number; }
  Cursor: { input: string; output: string; }
  Datetime: { input: string; output: string; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  UUID: { input: string; output: string; }
};

/** All input for the `addUserGeneSet` mutation. */
export type AddUserGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The output of our `addUserGeneSet` mutation. */
export type AddUserGeneSetPayload = {
  __typename?: 'AddUserGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  userGeneSet?: Maybe<UserGeneSet>;
  /** An edge for our `UserGeneSet`. May be used by Relay 1. */
  userGeneSetEdge?: Maybe<UserGeneSetsEdge>;
};


/** The output of our `addUserGeneSet` mutation. */
export type AddUserGeneSetPayloadUserGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<UserGeneSetsOrderBy>>;
};

export type Background = Node & {
  __typename?: 'Background';
  created?: Maybe<Scalars['Datetime']['output']>;
  enrich?: Maybe<PaginatedEnrichResult>;
  geneIds: Scalars['JSON']['output'];
  id: Scalars['UUID']['output'];
  nGeneIds: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  overlap: BackgroundOverlapConnection;
};


export type BackgroundEnrichArgs = {
  adjPvalueLe?: InputMaybe<Scalars['Float']['input']>;
  filterTerm?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  overlapGe?: InputMaybe<Scalars['Int']['input']>;
  pvalueLe?: InputMaybe<Scalars['Float']['input']>;
};


export type BackgroundOverlapArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genes: Array<InputMaybe<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  overlapGreaterThan?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * A condition to be used against `Background` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BackgroundCondition = {
  /** Checks for equality with the object’s `created` field. */
  created?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `geneIds` field. */
  geneIds?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `nGeneIds` field. */
  nGeneIds?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Background` */
export type BackgroundInput = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  geneIds: Scalars['JSON']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  nGeneIds: Scalars['Int']['input'];
};

/** A connection to a list of `BackgroundOverlapRecord` values. */
export type BackgroundOverlapConnection = {
  __typename?: 'BackgroundOverlapConnection';
  /** A list of edges which contains the `BackgroundOverlapRecord` and cursor to aid in pagination. */
  edges: Array<BackgroundOverlapEdge>;
  /** A list of `BackgroundOverlapRecord` objects. */
  nodes: Array<BackgroundOverlapRecord>;
  /** The count of *all* `BackgroundOverlapRecord` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `BackgroundOverlapRecord` edge in the connection. */
export type BackgroundOverlapEdge = {
  __typename?: 'BackgroundOverlapEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `BackgroundOverlapRecord` at the end of the edge. */
  node: BackgroundOverlapRecord;
};

/** The return type of our `overlap` query. */
export type BackgroundOverlapRecord = {
  __typename?: 'BackgroundOverlapRecord';
  geneSetId?: Maybe<Scalars['UUID']['output']>;
  nGsGeneIds?: Maybe<Scalars['Int']['output']>;
  nOverlapGeneIds?: Maybe<Scalars['Int']['output']>;
};

/** Represents an update to a `Background`. Fields that are set will be updated. */
export type BackgroundPatch = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  geneIds?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  nGeneIds?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Background` values. */
export type BackgroundsConnection = {
  __typename?: 'BackgroundsConnection';
  /** A list of edges which contains the `Background` and cursor to aid in pagination. */
  edges: Array<BackgroundsEdge>;
  /** A list of `Background` objects. */
  nodes: Array<Background>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Background` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Background` edge in the connection. */
export type BackgroundsEdge = {
  __typename?: 'BackgroundsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Background` at the end of the edge. */
  node: Background;
};

/** Methods to use when ordering `Background`. */
export enum BackgroundsOrderBy {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC',
  GeneIdsAsc = 'GENE_IDS_ASC',
  GeneIdsDesc = 'GENE_IDS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  NGeneIdsAsc = 'N_GENE_IDS_ASC',
  NGeneIdsDesc = 'N_GENE_IDS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `Background` mutation. */
export type CreateBackgroundInput = {
  /** The `Background` to be created by this mutation. */
  background: BackgroundInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Background` mutation. */
export type CreateBackgroundPayload = {
  __typename?: 'CreateBackgroundPayload';
  /** The `Background` that was created by this mutation. */
  background?: Maybe<Background>;
  /** An edge for our `Background`. May be used by Relay 1. */
  backgroundEdge?: Maybe<BackgroundsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Background` mutation. */
export type CreateBackgroundPayloadBackgroundEdgeArgs = {
  orderBy?: InputMaybe<Array<BackgroundsOrderBy>>;
};

/** All input for the create `Gene` mutation. */
export type CreateGeneInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Gene` to be created by this mutation. */
  gene: GeneInput;
};

/** The output of our create `Gene` mutation. */
export type CreateGenePayload = {
  __typename?: 'CreateGenePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Gene` that was created by this mutation. */
  gene?: Maybe<Gene>;
  /** An edge for our `Gene`. May be used by Relay 1. */
  geneEdge?: Maybe<GenesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Gene` mutation. */
export type CreateGenePayloadGeneEdgeArgs = {
  orderBy?: InputMaybe<Array<GenesOrderBy>>;
};

/** All input for the create `GeneSet` mutation. */
export type CreateGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `GeneSet` to be created by this mutation. */
  geneSet: GeneSetInput;
};

/** The output of our create `GeneSet` mutation. */
export type CreateGeneSetPayload = {
  __typename?: 'CreateGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `GeneSet` that was created by this mutation. */
  geneSet?: Maybe<GeneSet>;
  /** An edge for our `GeneSet`. May be used by Relay 1. */
  geneSetEdge?: Maybe<GeneSetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `GeneSet` mutation. */
export type CreateGeneSetPayloadGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<GeneSetsOrderBy>>;
};

/** All input for the create `PmcInfo` mutation. */
export type CreatePmcInfoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PmcInfo` to be created by this mutation. */
  pmcInfo: PmcInfoInput;
};

/** The output of our create `PmcInfo` mutation. */
export type CreatePmcInfoPayload = {
  __typename?: 'CreatePmcInfoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `GeneSetPmc` that is related to this `PmcInfo`. */
  geneSetPmcByPmcid?: Maybe<GeneSetPmc>;
  /** The `PmcInfo` that was created by this mutation. */
  pmcInfo?: Maybe<PmcInfo>;
  /** An edge for our `PmcInfo`. May be used by Relay 1. */
  pmcInfoEdge?: Maybe<PmcInfosEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PmcInfo` mutation. */
export type CreatePmcInfoPayloadPmcInfoEdgeArgs = {
  orderBy?: InputMaybe<Array<PmcInfosOrderBy>>;
};

/** All input for the create `Release` mutation. */
export type CreateReleaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Release` to be created by this mutation. */
  release: ReleaseInput;
};

/** The output of our create `Release` mutation. */
export type CreateReleasePayload = {
  __typename?: 'CreateReleasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Release` that was created by this mutation. */
  release?: Maybe<Release>;
  /** An edge for our `Release`. May be used by Relay 1. */
  releaseEdge?: Maybe<ReleasesEdge>;
};


/** The output of our create `Release` mutation. */
export type CreateReleasePayloadReleaseEdgeArgs = {
  orderBy?: InputMaybe<Array<ReleasesOrderBy>>;
};

/** All input for the create `UserGeneSet` mutation. */
export type CreateUserGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `UserGeneSet` to be created by this mutation. */
  userGeneSet: UserGeneSetInput;
};

/** The output of our create `UserGeneSet` mutation. */
export type CreateUserGeneSetPayload = {
  __typename?: 'CreateUserGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserGeneSet` that was created by this mutation. */
  userGeneSet?: Maybe<UserGeneSet>;
  /** An edge for our `UserGeneSet`. May be used by Relay 1. */
  userGeneSetEdge?: Maybe<UserGeneSetsEdge>;
};


/** The output of our create `UserGeneSet` mutation. */
export type CreateUserGeneSetPayloadUserGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<UserGeneSetsOrderBy>>;
};

/** All input for the `deleteBackgroundById` mutation. */
export type DeleteBackgroundByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `deleteBackground` mutation. */
export type DeleteBackgroundInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Background` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Background` mutation. */
export type DeleteBackgroundPayload = {
  __typename?: 'DeleteBackgroundPayload';
  /** The `Background` that was deleted by this mutation. */
  background?: Maybe<Background>;
  /** An edge for our `Background`. May be used by Relay 1. */
  backgroundEdge?: Maybe<BackgroundsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedBackgroundId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Background` mutation. */
export type DeleteBackgroundPayloadBackgroundEdgeArgs = {
  orderBy?: InputMaybe<Array<BackgroundsOrderBy>>;
};

/** All input for the `deleteGeneById` mutation. */
export type DeleteGeneByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `deleteGeneBySymbol` mutation. */
export type DeleteGeneBySymbolInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  symbol: Scalars['String']['input'];
};

/** All input for the `deleteGene` mutation. */
export type DeleteGeneInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Gene` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Gene` mutation. */
export type DeleteGenePayload = {
  __typename?: 'DeleteGenePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedGeneId?: Maybe<Scalars['ID']['output']>;
  /** The `Gene` that was deleted by this mutation. */
  gene?: Maybe<Gene>;
  /** An edge for our `Gene`. May be used by Relay 1. */
  geneEdge?: Maybe<GenesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Gene` mutation. */
export type DeleteGenePayloadGeneEdgeArgs = {
  orderBy?: InputMaybe<Array<GenesOrderBy>>;
};

/** All input for the `deleteGeneSetById` mutation. */
export type DeleteGeneSetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `deleteGeneSetByTerm` mutation. */
export type DeleteGeneSetByTermInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  term: Scalars['String']['input'];
};

/** All input for the `deleteGeneSet` mutation. */
export type DeleteGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `GeneSet` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `GeneSet` mutation. */
export type DeleteGeneSetPayload = {
  __typename?: 'DeleteGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedGeneSetId?: Maybe<Scalars['ID']['output']>;
  /** The `GeneSet` that was deleted by this mutation. */
  geneSet?: Maybe<GeneSet>;
  /** An edge for our `GeneSet`. May be used by Relay 1. */
  geneSetEdge?: Maybe<GeneSetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `GeneSet` mutation. */
export type DeleteGeneSetPayloadGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<GeneSetsOrderBy>>;
};

/** All input for the `deletePmcInfoById` mutation. */
export type DeletePmcInfoByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `deletePmcInfoByPmcid` mutation. */
export type DeletePmcInfoByPmcidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pmcid: Scalars['String']['input'];
};

/** All input for the `deletePmcInfo` mutation. */
export type DeletePmcInfoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PmcInfo` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `PmcInfo` mutation. */
export type DeletePmcInfoPayload = {
  __typename?: 'DeletePmcInfoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPmcInfoId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `GeneSetPmc` that is related to this `PmcInfo`. */
  geneSetPmcByPmcid?: Maybe<GeneSetPmc>;
  /** The `PmcInfo` that was deleted by this mutation. */
  pmcInfo?: Maybe<PmcInfo>;
  /** An edge for our `PmcInfo`. May be used by Relay 1. */
  pmcInfoEdge?: Maybe<PmcInfosEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PmcInfo` mutation. */
export type DeletePmcInfoPayloadPmcInfoEdgeArgs = {
  orderBy?: InputMaybe<Array<PmcInfosOrderBy>>;
};

/** All input for the `deleteReleaseById` mutation. */
export type DeleteReleaseByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `deleteRelease` mutation. */
export type DeleteReleaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Release` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Release` mutation. */
export type DeleteReleasePayload = {
  __typename?: 'DeleteReleasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedReleaseId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Release` that was deleted by this mutation. */
  release?: Maybe<Release>;
  /** An edge for our `Release`. May be used by Relay 1. */
  releaseEdge?: Maybe<ReleasesEdge>;
};


/** The output of our delete `Release` mutation. */
export type DeleteReleasePayloadReleaseEdgeArgs = {
  orderBy?: InputMaybe<Array<ReleasesOrderBy>>;
};

/** All input for the `deleteUserGeneSetById` mutation. */
export type DeleteUserGeneSetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `deleteUserGeneSet` mutation. */
export type DeleteUserGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UserGeneSet` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `UserGeneSet` mutation. */
export type DeleteUserGeneSetPayload = {
  __typename?: 'DeleteUserGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserGeneSetId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserGeneSet` that was deleted by this mutation. */
  userGeneSet?: Maybe<UserGeneSet>;
  /** An edge for our `UserGeneSet`. May be used by Relay 1. */
  userGeneSetEdge?: Maybe<UserGeneSetsEdge>;
};


/** The output of our delete `UserGeneSet` mutation. */
export type DeleteUserGeneSetPayloadUserGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<UserGeneSetsOrderBy>>;
};

export type EnrichResult = {
  __typename?: 'EnrichResult';
  adjPvalue?: Maybe<Scalars['Float']['output']>;
  geneSetHash?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `GeneSet`. */
  geneSets: GeneSetsConnection;
  nOverlap?: Maybe<Scalars['Int']['output']>;
  oddsRatio?: Maybe<Scalars['Float']['output']>;
  pvalue?: Maybe<Scalars['Float']['output']>;
};


export type EnrichResultGeneSetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Gene = Node & {
  __typename?: 'Gene';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  ncbiGeneId?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  symbol: Scalars['String']['output'];
  synonyms?: Maybe<Scalars['JSON']['output']>;
};

/** A condition to be used against `Gene` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GeneCondition = {
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `ncbiGeneId` field. */
  ncbiGeneId?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `summary` field. */
  summary?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `symbol` field. */
  symbol?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `synonyms` field. */
  synonyms?: InputMaybe<Scalars['JSON']['input']>;
};

/** An input for mutations affecting `Gene` */
export type GeneInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  ncbiGeneId?: InputMaybe<Scalars['Int']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  symbol: Scalars['String']['input'];
  synonyms?: InputMaybe<Scalars['JSON']['input']>;
};

export type GeneMapping = {
  __typename?: 'GeneMapping';
  gene?: Maybe<Scalars['String']['output']>;
  geneId?: Maybe<Scalars['UUID']['output']>;
  geneInfo?: Maybe<Gene>;
};

/** A connection to a list of `GeneMapping` values. */
export type GeneMappingsConnection = {
  __typename?: 'GeneMappingsConnection';
  /** A list of edges which contains the `GeneMapping` and cursor to aid in pagination. */
  edges: Array<GeneMappingsEdge>;
  /** A list of `GeneMapping` objects. */
  nodes: Array<GeneMapping>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GeneMapping` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `GeneMapping` edge in the connection. */
export type GeneMappingsEdge = {
  __typename?: 'GeneMappingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GeneMapping` at the end of the edge. */
  node: GeneMapping;
};

/** Represents an update to a `Gene`. Fields that are set will be updated. */
export type GenePatch = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  ncbiGeneId?: InputMaybe<Scalars['Int']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  synonyms?: InputMaybe<Scalars['JSON']['input']>;
};

export type GeneSet = Node & {
  __typename?: 'GeneSet';
  created: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  geneIds: Scalars['JSON']['output'];
  /** Reads and enables pagination through a set of `GeneSetPmc`. */
  geneSetPmcsById: GeneSetPmcsConnection;
  /** Reads and enables pagination through a set of `Gene`. */
  genes: GenesConnection;
  hash: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  nGeneIds: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Gene`. */
  overlap: GenesConnection;
  term: Scalars['String']['output'];
};


export type GeneSetGeneSetPmcsByIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneSetPmcCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneSetPmcsOrderBy>>;
};


export type GeneSetGenesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type GeneSetOverlapArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genes: Array<InputMaybe<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** A condition to be used against `GeneSet` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GeneSetCondition = {
  /** Checks for equality with the object’s `created` field. */
  created?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `geneIds` field. */
  geneIds?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `hash` field. */
  hash?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `nGeneIds` field. */
  nGeneIds?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `term` field. */
  term?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `GeneSet` */
export type GeneSetInput = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  geneIds: Scalars['JSON']['input'];
  hash: Scalars['UUID']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  nGeneIds: Scalars['Int']['input'];
  term: Scalars['String']['input'];
};

/** Represents an update to a `GeneSet`. Fields that are set will be updated. */
export type GeneSetPatch = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  geneIds?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  nGeneIds?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
};

export type GeneSetPmc = {
  __typename?: 'GeneSetPmc';
  /** Reads a single `GeneSet` that is related to this `GeneSetPmc`. */
  geneSetById?: Maybe<GeneSet>;
  id?: Maybe<Scalars['UUID']['output']>;
  pmc?: Maybe<Scalars['String']['output']>;
  /** Reads a single `PmcInfo` that is related to this `GeneSetPmc`. */
  pmcInfoByPmcid?: Maybe<PmcInfo>;
  /**
   * Reads and enables pagination through a set of `PmcInfo`.
   * @deprecated Please use pmcInfoByPmcid instead
   */
  pmcInfosByPmcid: PmcInfosConnection;
  /** Reads and enables pagination through a set of `Pmc`. */
  pmcsByPmc: PmcsConnection;
};


export type GeneSetPmcPmcInfosByPmcidArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PmcInfoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PmcInfosOrderBy>>;
};


export type GeneSetPmcPmcsByPmcArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PmcCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PmcsOrderBy>>;
};

/**
 * A condition to be used against `GeneSetPmc` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GeneSetPmcCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `pmc` field. */
  pmc?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `GeneSetPmc` values. */
export type GeneSetPmcsConnection = {
  __typename?: 'GeneSetPmcsConnection';
  /** A list of edges which contains the `GeneSetPmc` and cursor to aid in pagination. */
  edges: Array<GeneSetPmcsEdge>;
  /** A list of `GeneSetPmc` objects. */
  nodes: Array<GeneSetPmc>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GeneSetPmc` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `GeneSetPmc` edge in the connection. */
export type GeneSetPmcsEdge = {
  __typename?: 'GeneSetPmcsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GeneSetPmc` at the end of the edge. */
  node: GeneSetPmc;
};

/** Methods to use when ordering `GeneSetPmc`. */
export enum GeneSetPmcsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmcAsc = 'PMC_ASC',
  PmcDesc = 'PMC_DESC'
}

/** A connection to a list of `GeneSet` values. */
export type GeneSetsConnection = {
  __typename?: 'GeneSetsConnection';
  /** A list of edges which contains the `GeneSet` and cursor to aid in pagination. */
  edges: Array<GeneSetsEdge>;
  /** A list of `GeneSet` objects. */
  nodes: Array<GeneSet>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GeneSet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `GeneSet` edge in the connection. */
export type GeneSetsEdge = {
  __typename?: 'GeneSetsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `GeneSet` at the end of the edge. */
  node: GeneSet;
};

/** Methods to use when ordering `GeneSet`. */
export enum GeneSetsOrderBy {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  GeneIdsAsc = 'GENE_IDS_ASC',
  GeneIdsDesc = 'GENE_IDS_DESC',
  HashAsc = 'HASH_ASC',
  HashDesc = 'HASH_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  NGeneIdsAsc = 'N_GENE_IDS_ASC',
  NGeneIdsDesc = 'N_GENE_IDS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TermAsc = 'TERM_ASC',
  TermDesc = 'TERM_DESC'
}

/** A connection to a list of `Gene` values. */
export type GenesConnection = {
  __typename?: 'GenesConnection';
  /** A list of edges which contains the `Gene` and cursor to aid in pagination. */
  edges: Array<GenesEdge>;
  /** A list of `Gene` objects. */
  nodes: Array<Gene>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Gene` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Gene` edge in the connection. */
export type GenesEdge = {
  __typename?: 'GenesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Gene` at the end of the edge. */
  node: Gene;
};

/** Methods to use when ordering `Gene`. */
export enum GenesOrderBy {
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  NcbiGeneIdAsc = 'NCBI_GENE_ID_ASC',
  NcbiGeneIdDesc = 'NCBI_GENE_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SummaryAsc = 'SUMMARY_ASC',
  SummaryDesc = 'SUMMARY_DESC',
  SymbolAsc = 'SYMBOL_ASC',
  SymbolDesc = 'SYMBOL_DESC',
  SynonymsAsc = 'SYNONYMS_ASC',
  SynonymsDesc = 'SYNONYMS_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  addUserGeneSet?: Maybe<AddUserGeneSetPayload>;
  /** Creates a single `Background`. */
  createBackground?: Maybe<CreateBackgroundPayload>;
  /** Creates a single `Gene`. */
  createGene?: Maybe<CreateGenePayload>;
  /** Creates a single `GeneSet`. */
  createGeneSet?: Maybe<CreateGeneSetPayload>;
  /** Creates a single `PmcInfo`. */
  createPmcInfo?: Maybe<CreatePmcInfoPayload>;
  /** Creates a single `Release`. */
  createRelease?: Maybe<CreateReleasePayload>;
  /** Creates a single `UserGeneSet`. */
  createUserGeneSet?: Maybe<CreateUserGeneSetPayload>;
  /** Deletes a single `Background` using its globally unique id. */
  deleteBackground?: Maybe<DeleteBackgroundPayload>;
  /** Deletes a single `Background` using a unique key. */
  deleteBackgroundById?: Maybe<DeleteBackgroundPayload>;
  /** Deletes a single `Gene` using its globally unique id. */
  deleteGene?: Maybe<DeleteGenePayload>;
  /** Deletes a single `Gene` using a unique key. */
  deleteGeneById?: Maybe<DeleteGenePayload>;
  /** Deletes a single `Gene` using a unique key. */
  deleteGeneBySymbol?: Maybe<DeleteGenePayload>;
  /** Deletes a single `GeneSet` using its globally unique id. */
  deleteGeneSet?: Maybe<DeleteGeneSetPayload>;
  /** Deletes a single `GeneSet` using a unique key. */
  deleteGeneSetById?: Maybe<DeleteGeneSetPayload>;
  /** Deletes a single `GeneSet` using a unique key. */
  deleteGeneSetByTerm?: Maybe<DeleteGeneSetPayload>;
  /** Deletes a single `PmcInfo` using its globally unique id. */
  deletePmcInfo?: Maybe<DeletePmcInfoPayload>;
  /** Deletes a single `PmcInfo` using a unique key. */
  deletePmcInfoById?: Maybe<DeletePmcInfoPayload>;
  /** Deletes a single `PmcInfo` using a unique key. */
  deletePmcInfoByPmcid?: Maybe<DeletePmcInfoPayload>;
  /** Deletes a single `Release` using its globally unique id. */
  deleteRelease?: Maybe<DeleteReleasePayload>;
  /** Deletes a single `Release` using a unique key. */
  deleteReleaseById?: Maybe<DeleteReleasePayload>;
  /** Deletes a single `UserGeneSet` using its globally unique id. */
  deleteUserGeneSet?: Maybe<DeleteUserGeneSetPayload>;
  /** Deletes a single `UserGeneSet` using a unique key. */
  deleteUserGeneSetById?: Maybe<DeleteUserGeneSetPayload>;
  /** Updates a single `Background` using its globally unique id and a patch. */
  updateBackground?: Maybe<UpdateBackgroundPayload>;
  /** Updates a single `Background` using a unique key and a patch. */
  updateBackgroundById?: Maybe<UpdateBackgroundPayload>;
  /** Updates a single `Gene` using its globally unique id and a patch. */
  updateGene?: Maybe<UpdateGenePayload>;
  /** Updates a single `Gene` using a unique key and a patch. */
  updateGeneById?: Maybe<UpdateGenePayload>;
  /** Updates a single `Gene` using a unique key and a patch. */
  updateGeneBySymbol?: Maybe<UpdateGenePayload>;
  /** Updates a single `GeneSet` using its globally unique id and a patch. */
  updateGeneSet?: Maybe<UpdateGeneSetPayload>;
  /** Updates a single `GeneSet` using a unique key and a patch. */
  updateGeneSetById?: Maybe<UpdateGeneSetPayload>;
  /** Updates a single `GeneSet` using a unique key and a patch. */
  updateGeneSetByTerm?: Maybe<UpdateGeneSetPayload>;
  /** Updates a single `PmcInfo` using its globally unique id and a patch. */
  updatePmcInfo?: Maybe<UpdatePmcInfoPayload>;
  /** Updates a single `PmcInfo` using a unique key and a patch. */
  updatePmcInfoById?: Maybe<UpdatePmcInfoPayload>;
  /** Updates a single `PmcInfo` using a unique key and a patch. */
  updatePmcInfoByPmcid?: Maybe<UpdatePmcInfoPayload>;
  /** Updates a single `Release` using its globally unique id and a patch. */
  updateRelease?: Maybe<UpdateReleasePayload>;
  /** Updates a single `Release` using a unique key and a patch. */
  updateReleaseById?: Maybe<UpdateReleasePayload>;
  /** Updates a single `UserGeneSet` using its globally unique id and a patch. */
  updateUserGeneSet?: Maybe<UpdateUserGeneSetPayload>;
  /** Updates a single `UserGeneSet` using a unique key and a patch. */
  updateUserGeneSetById?: Maybe<UpdateUserGeneSetPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAddUserGeneSetArgs = {
  input: AddUserGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBackgroundArgs = {
  input: CreateBackgroundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGeneArgs = {
  input: CreateGeneInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGeneSetArgs = {
  input: CreateGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePmcInfoArgs = {
  input: CreatePmcInfoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateReleaseArgs = {
  input: CreateReleaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserGeneSetArgs = {
  input: CreateUserGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBackgroundArgs = {
  input: DeleteBackgroundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBackgroundByIdArgs = {
  input: DeleteBackgroundByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGeneArgs = {
  input: DeleteGeneInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGeneByIdArgs = {
  input: DeleteGeneByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGeneBySymbolArgs = {
  input: DeleteGeneBySymbolInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGeneSetArgs = {
  input: DeleteGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGeneSetByIdArgs = {
  input: DeleteGeneSetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGeneSetByTermArgs = {
  input: DeleteGeneSetByTermInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePmcInfoArgs = {
  input: DeletePmcInfoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePmcInfoByIdArgs = {
  input: DeletePmcInfoByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePmcInfoByPmcidArgs = {
  input: DeletePmcInfoByPmcidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReleaseArgs = {
  input: DeleteReleaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReleaseByIdArgs = {
  input: DeleteReleaseByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserGeneSetArgs = {
  input: DeleteUserGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserGeneSetByIdArgs = {
  input: DeleteUserGeneSetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBackgroundArgs = {
  input: UpdateBackgroundInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBackgroundByIdArgs = {
  input: UpdateBackgroundByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGeneArgs = {
  input: UpdateGeneInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGeneByIdArgs = {
  input: UpdateGeneByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGeneBySymbolArgs = {
  input: UpdateGeneBySymbolInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGeneSetArgs = {
  input: UpdateGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGeneSetByIdArgs = {
  input: UpdateGeneSetByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGeneSetByTermArgs = {
  input: UpdateGeneSetByTermInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePmcInfoArgs = {
  input: UpdatePmcInfoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePmcInfoByIdArgs = {
  input: UpdatePmcInfoByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePmcInfoByPmcidArgs = {
  input: UpdatePmcInfoByPmcidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReleaseArgs = {
  input: UpdateReleaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReleaseByIdArgs = {
  input: UpdateReleaseByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserGeneSetArgs = {
  input: UpdateUserGeneSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserGeneSetByIdArgs = {
  input: UpdateUserGeneSetByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type PaginatedEnrichResult = {
  __typename?: 'PaginatedEnrichResult';
  nodes?: Maybe<Array<Maybe<EnrichResult>>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Pmc = {
  __typename?: 'Pmc';
  /** Reads a single `GeneSetPmc` that is related to this `Pmc`. */
  geneSetPmcByPmc?: Maybe<GeneSetPmc>;
  pmc?: Maybe<Scalars['String']['output']>;
};

/** A condition to be used against `Pmc` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PmcCondition = {
  /** Checks for equality with the object’s `pmc` field. */
  pmc?: InputMaybe<Scalars['String']['input']>;
};

export type PmcInfo = Node & {
  __typename?: 'PmcInfo';
  doi?: Maybe<Scalars['String']['output']>;
  /** Reads a single `GeneSetPmc` that is related to this `PmcInfo`. */
  geneSetPmcByPmcid?: Maybe<GeneSetPmc>;
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  pmcid: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  yr?: Maybe<Scalars['Int']['output']>;
};

/** A condition to be used against `PmcInfo` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PmcInfoCondition = {
  /** Checks for equality with the object’s `doi` field. */
  doi?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `pmcid` field. */
  pmcid?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `yr` field. */
  yr?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `PmcInfo` */
export type PmcInfoInput = {
  doi?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  pmcid: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  yr?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `PmcInfo`. Fields that are set will be updated. */
export type PmcInfoPatch = {
  doi?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  pmcid?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  yr?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `PmcInfo` values. */
export type PmcInfosConnection = {
  __typename?: 'PmcInfosConnection';
  /** A list of edges which contains the `PmcInfo` and cursor to aid in pagination. */
  edges: Array<PmcInfosEdge>;
  /** A list of `PmcInfo` objects. */
  nodes: Array<PmcInfo>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PmcInfo` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `PmcInfo` edge in the connection. */
export type PmcInfosEdge = {
  __typename?: 'PmcInfosEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PmcInfo` at the end of the edge. */
  node: PmcInfo;
};

/** Methods to use when ordering `PmcInfo`. */
export enum PmcInfosOrderBy {
  DoiAsc = 'DOI_ASC',
  DoiDesc = 'DOI_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PmcidAsc = 'PMCID_ASC',
  PmcidDesc = 'PMCID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  YrAsc = 'YR_ASC',
  YrDesc = 'YR_DESC'
}

export type PmcStat = {
  __typename?: 'PmcStat';
  nPublicationsProcessed?: Maybe<Scalars['BigInt']['output']>;
};

/** A connection to a list of `Pmc` values. */
export type PmcsConnection = {
  __typename?: 'PmcsConnection';
  /** A list of edges which contains the `Pmc` and cursor to aid in pagination. */
  edges: Array<PmcsEdge>;
  /** A list of `Pmc` objects. */
  nodes: Array<Pmc>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Pmc` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Pmc` edge in the connection. */
export type PmcsEdge = {
  __typename?: 'PmcsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Pmc` at the end of the edge. */
  node: Pmc;
};

/** Methods to use when ordering `Pmc`. */
export enum PmcsOrderBy {
  Natural = 'NATURAL',
  PmcAsc = 'PMC_ASC',
  PmcDesc = 'PMC_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `Background`. */
  allBackgrounds?: Maybe<BackgroundsConnection>;
  /** Reads and enables pagination through a set of `GeneSetPmc`. */
  allGeneSetPmcs?: Maybe<GeneSetPmcsConnection>;
  /** Reads and enables pagination through a set of `GeneSet`. */
  allGeneSets?: Maybe<GeneSetsConnection>;
  /** Reads and enables pagination through a set of `Gene`. */
  allGenes?: Maybe<GenesConnection>;
  /** Reads and enables pagination through a set of `PmcInfo`. */
  allPmcInfos?: Maybe<PmcInfosConnection>;
  /** Reads and enables pagination through a set of `Pmc`. */
  allPmcs?: Maybe<PmcsConnection>;
  /** Reads and enables pagination through a set of `Release`. */
  allReleases?: Maybe<ReleasesConnection>;
  /** Reads and enables pagination through a set of `UserGeneSet`. */
  allUserGeneSets?: Maybe<UserGeneSetsConnection>;
  /** Reads a single `Background` using its globally unique `ID`. */
  background?: Maybe<Background>;
  backgroundById?: Maybe<Background>;
  currentBackground?: Maybe<Background>;
  /** Reads a single `Gene` using its globally unique `ID`. */
  gene?: Maybe<Gene>;
  geneById?: Maybe<Gene>;
  geneBySymbol?: Maybe<Gene>;
  /** Reads and enables pagination through a set of `GeneMapping`. */
  geneMap?: Maybe<GeneMappingsConnection>;
  /** Reads and enables pagination through a set of `GeneMapping`. */
  geneMap2?: Maybe<GeneMappingsConnection>;
  /** Reads a single `GeneSet` using its globally unique `ID`. */
  geneSet?: Maybe<GeneSet>;
  geneSetById?: Maybe<GeneSet>;
  geneSetByTerm?: Maybe<GeneSet>;
  /** Reads and enables pagination through a set of `GeneSet`. */
  geneSetGeneSearch?: Maybe<GeneSetsConnection>;
  /** Reads and enables pagination through a set of `GeneSet`. */
  geneSetTermSearch?: Maybe<GeneSetsConnection>;
  /** Reads and enables pagination through a set of `PmcInfo`. */
  getPmcInfoByIds?: Maybe<PmcInfosConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `PmcInfo` using its globally unique `ID`. */
  pmcInfo?: Maybe<PmcInfo>;
  pmcInfoById?: Maybe<PmcInfo>;
  pmcInfoByPmcid?: Maybe<PmcInfo>;
  pmcStats?: Maybe<PmcStat>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `Release` using its globally unique `ID`. */
  release?: Maybe<Release>;
  releaseById?: Maybe<Release>;
  termsPmcsCount?: Maybe<TermsPmcsCountConnection>;
  /** Reads a single `UserGeneSet` using its globally unique `ID`. */
  userGeneSet?: Maybe<UserGeneSet>;
  userGeneSetById?: Maybe<UserGeneSet>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBackgroundsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BackgroundCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BackgroundsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllGeneSetPmcsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneSetPmcCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneSetPmcsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllGeneSetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneSetCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GeneSetsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllGenesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<GeneCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GenesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPmcInfosArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PmcInfoCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PmcInfosOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPmcsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PmcCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PmcsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllReleasesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReleaseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReleasesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUserGeneSetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserGeneSetCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserGeneSetsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBackgroundArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBackgroundByIdArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneByIdArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneBySymbolArgs = {
  symbol: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneMapArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genes: Array<InputMaybe<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneMap2Args = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genes: Array<InputMaybe<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneSetArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneSetByIdArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneSetByTermArgs = {
  term: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneSetGeneSearchArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  genes: Array<InputMaybe<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGeneSetTermSearchArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  terms: Array<InputMaybe<Scalars['String']['input']>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetPmcInfoByIdsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pmcids: Array<InputMaybe<Scalars['String']['input']>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPmcInfoArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPmcInfoByIdArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPmcInfoByPmcidArgs = {
  pmcid: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReleaseArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReleaseByIdArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTermsPmcsCountArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pmcids: Array<InputMaybe<Scalars['String']['input']>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserGeneSetArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserGeneSetByIdArgs = {
  id: Scalars['UUID']['input'];
};

export type Release = Node & {
  __typename?: 'Release';
  created?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  nPublicationsProcessed?: Maybe<Scalars['BigInt']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** A condition to be used against `Release` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ReleaseCondition = {
  /** Checks for equality with the object’s `created` field. */
  created?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `nPublicationsProcessed` field. */
  nPublicationsProcessed?: InputMaybe<Scalars['BigInt']['input']>;
};

/** An input for mutations affecting `Release` */
export type ReleaseInput = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  nPublicationsProcessed?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Represents an update to a `Release`. Fields that are set will be updated. */
export type ReleasePatch = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  nPublicationsProcessed?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A connection to a list of `Release` values. */
export type ReleasesConnection = {
  __typename?: 'ReleasesConnection';
  /** A list of edges which contains the `Release` and cursor to aid in pagination. */
  edges: Array<ReleasesEdge>;
  /** A list of `Release` objects. */
  nodes: Array<Release>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Release` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Release` edge in the connection. */
export type ReleasesEdge = {
  __typename?: 'ReleasesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Release` at the end of the edge. */
  node: Release;
};

/** Methods to use when ordering `Release`. */
export enum ReleasesOrderBy {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  NPublicationsProcessedAsc = 'N_PUBLICATIONS_PROCESSED_ASC',
  NPublicationsProcessedDesc = 'N_PUBLICATIONS_PROCESSED_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `TermsPmcsCountRecord` values. */
export type TermsPmcsCountConnection = {
  __typename?: 'TermsPmcsCountConnection';
  /** A list of edges which contains the `TermsPmcsCountRecord` and cursor to aid in pagination. */
  edges: Array<TermsPmcsCountEdge>;
  /** A list of `TermsPmcsCountRecord` objects. */
  nodes: Array<TermsPmcsCountRecord>;
  /** The count of *all* `TermsPmcsCountRecord` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TermsPmcsCountRecord` edge in the connection. */
export type TermsPmcsCountEdge = {
  __typename?: 'TermsPmcsCountEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TermsPmcsCountRecord` at the end of the edge. */
  node: TermsPmcsCountRecord;
};

/** The return type of our `termsPmcsCount` query. */
export type TermsPmcsCountRecord = {
  __typename?: 'TermsPmcsCountRecord';
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  pmc?: Maybe<Scalars['String']['output']>;
  term?: Maybe<Scalars['String']['output']>;
};

/** All input for the `updateBackgroundById` mutation. */
export type UpdateBackgroundByIdInput = {
  /** An object where the defined keys will be set on the `Background` being updated. */
  backgroundPatch: BackgroundPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** All input for the `updateBackground` mutation. */
export type UpdateBackgroundInput = {
  /** An object where the defined keys will be set on the `Background` being updated. */
  backgroundPatch: BackgroundPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Background` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `Background` mutation. */
export type UpdateBackgroundPayload = {
  __typename?: 'UpdateBackgroundPayload';
  /** The `Background` that was updated by this mutation. */
  background?: Maybe<Background>;
  /** An edge for our `Background`. May be used by Relay 1. */
  backgroundEdge?: Maybe<BackgroundsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Background` mutation. */
export type UpdateBackgroundPayloadBackgroundEdgeArgs = {
  orderBy?: InputMaybe<Array<BackgroundsOrderBy>>;
};

/** All input for the `updateGeneById` mutation. */
export type UpdateGeneByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Gene` being updated. */
  genePatch: GenePatch;
  id: Scalars['UUID']['input'];
};

/** All input for the `updateGeneBySymbol` mutation. */
export type UpdateGeneBySymbolInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Gene` being updated. */
  genePatch: GenePatch;
  symbol: Scalars['String']['input'];
};

/** All input for the `updateGene` mutation. */
export type UpdateGeneInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Gene` being updated. */
  genePatch: GenePatch;
  /** The globally unique `ID` which will identify a single `Gene` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `Gene` mutation. */
export type UpdateGenePayload = {
  __typename?: 'UpdateGenePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Gene` that was updated by this mutation. */
  gene?: Maybe<Gene>;
  /** An edge for our `Gene`. May be used by Relay 1. */
  geneEdge?: Maybe<GenesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Gene` mutation. */
export type UpdateGenePayloadGeneEdgeArgs = {
  orderBy?: InputMaybe<Array<GenesOrderBy>>;
};

/** All input for the `updateGeneSetById` mutation. */
export type UpdateGeneSetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `GeneSet` being updated. */
  geneSetPatch: GeneSetPatch;
  id: Scalars['UUID']['input'];
};

/** All input for the `updateGeneSetByTerm` mutation. */
export type UpdateGeneSetByTermInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `GeneSet` being updated. */
  geneSetPatch: GeneSetPatch;
  term: Scalars['String']['input'];
};

/** All input for the `updateGeneSet` mutation. */
export type UpdateGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `GeneSet` being updated. */
  geneSetPatch: GeneSetPatch;
  /** The globally unique `ID` which will identify a single `GeneSet` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `GeneSet` mutation. */
export type UpdateGeneSetPayload = {
  __typename?: 'UpdateGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `GeneSet` that was updated by this mutation. */
  geneSet?: Maybe<GeneSet>;
  /** An edge for our `GeneSet`. May be used by Relay 1. */
  geneSetEdge?: Maybe<GeneSetsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `GeneSet` mutation. */
export type UpdateGeneSetPayloadGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<GeneSetsOrderBy>>;
};

/** All input for the `updatePmcInfoById` mutation. */
export type UpdatePmcInfoByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `PmcInfo` being updated. */
  pmcInfoPatch: PmcInfoPatch;
};

/** All input for the `updatePmcInfoByPmcid` mutation. */
export type UpdatePmcInfoByPmcidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PmcInfo` being updated. */
  pmcInfoPatch: PmcInfoPatch;
  pmcid: Scalars['String']['input'];
};

/** All input for the `updatePmcInfo` mutation. */
export type UpdatePmcInfoInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `PmcInfo` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `PmcInfo` being updated. */
  pmcInfoPatch: PmcInfoPatch;
};

/** The output of our update `PmcInfo` mutation. */
export type UpdatePmcInfoPayload = {
  __typename?: 'UpdatePmcInfoPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `GeneSetPmc` that is related to this `PmcInfo`. */
  geneSetPmcByPmcid?: Maybe<GeneSetPmc>;
  /** The `PmcInfo` that was updated by this mutation. */
  pmcInfo?: Maybe<PmcInfo>;
  /** An edge for our `PmcInfo`. May be used by Relay 1. */
  pmcInfoEdge?: Maybe<PmcInfosEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PmcInfo` mutation. */
export type UpdatePmcInfoPayloadPmcInfoEdgeArgs = {
  orderBy?: InputMaybe<Array<PmcInfosOrderBy>>;
};

/** All input for the `updateReleaseById` mutation. */
export type UpdateReleaseByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `Release` being updated. */
  releasePatch: ReleasePatch;
};

/** All input for the `updateRelease` mutation. */
export type UpdateReleaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Release` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Release` being updated. */
  releasePatch: ReleasePatch;
};

/** The output of our update `Release` mutation. */
export type UpdateReleasePayload = {
  __typename?: 'UpdateReleasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Release` that was updated by this mutation. */
  release?: Maybe<Release>;
  /** An edge for our `Release`. May be used by Relay 1. */
  releaseEdge?: Maybe<ReleasesEdge>;
};


/** The output of our update `Release` mutation. */
export type UpdateReleasePayloadReleaseEdgeArgs = {
  orderBy?: InputMaybe<Array<ReleasesOrderBy>>;
};

/** All input for the `updateUserGeneSetById` mutation. */
export type UpdateUserGeneSetByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `UserGeneSet` being updated. */
  userGeneSetPatch: UserGeneSetPatch;
};

/** All input for the `updateUserGeneSet` mutation. */
export type UpdateUserGeneSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UserGeneSet` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `UserGeneSet` being updated. */
  userGeneSetPatch: UserGeneSetPatch;
};

/** The output of our update `UserGeneSet` mutation. */
export type UpdateUserGeneSetPayload = {
  __typename?: 'UpdateUserGeneSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserGeneSet` that was updated by this mutation. */
  userGeneSet?: Maybe<UserGeneSet>;
  /** An edge for our `UserGeneSet`. May be used by Relay 1. */
  userGeneSetEdge?: Maybe<UserGeneSetsEdge>;
};


/** The output of our update `UserGeneSet` mutation. */
export type UpdateUserGeneSetPayloadUserGeneSetEdgeArgs = {
  orderBy?: InputMaybe<Array<UserGeneSetsOrderBy>>;
};

export type UserGeneSet = Node & {
  __typename?: 'UserGeneSet';
  created: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/**
 * A condition to be used against `UserGeneSet` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserGeneSetCondition = {
  /** Checks for equality with the object’s `created` field. */
  created?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `genes` field. */
  genes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `UserGeneSet` */
export type UserGeneSetInput = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['UUID']['input']>;
};

/** Represents an update to a `UserGeneSet`. Fields that are set will be updated. */
export type UserGeneSetPatch = {
  created?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `UserGeneSet` values. */
export type UserGeneSetsConnection = {
  __typename?: 'UserGeneSetsConnection';
  /** A list of edges which contains the `UserGeneSet` and cursor to aid in pagination. */
  edges: Array<UserGeneSetsEdge>;
  /** A list of `UserGeneSet` objects. */
  nodes: Array<UserGeneSet>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserGeneSet` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `UserGeneSet` edge in the connection. */
export type UserGeneSetsEdge = {
  __typename?: 'UserGeneSetsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UserGeneSet` at the end of the edge. */
  node: UserGeneSet;
};

/** Methods to use when ordering `UserGeneSet`. */
export enum UserGeneSetsOrderBy {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  GenesAsc = 'GENES_ASC',
  GenesDesc = 'GENES_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'Query', allUserGeneSets?: { __typename?: 'UserGeneSetsConnection', totalCount: number } | null, allGeneSets?: { __typename?: 'GeneSetsConnection', totalCount: number } | null, allGeneSetPmcs?: { __typename?: 'GeneSetPmcsConnection', totalCount: number } | null, pmcStats?: { __typename?: 'PmcStat', nPublicationsProcessed?: number | null } | null };

export type FetchUserGeneSetQueryVariables = Exact<{
  nodeId: Scalars['ID']['input'];
}>;


export type FetchUserGeneSetQuery = { __typename?: 'Query', userGeneSet?: { __typename?: 'UserGeneSet', id: string, genes?: Array<string | null> | null, description?: string | null } | null };

export type EnrichmentQueryQueryVariables = Exact<{
  genes: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
  filterTerm?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EnrichmentQueryQuery = { __typename?: 'Query', currentBackground?: { __typename?: 'Background', enrich?: { __typename?: 'PaginatedEnrichResult', totalCount?: number | null, nodes?: Array<{ __typename?: 'EnrichResult', geneSetHash?: string | null, pvalue?: number | null, adjPvalue?: number | null, oddsRatio?: number | null, nOverlap?: number | null, geneSets: { __typename?: 'GeneSetsConnection', totalCount: number, nodes: Array<{ __typename?: 'GeneSet', id: string, term: string, description?: string | null, nGeneIds: number, geneSetPmcsById: { __typename?: 'GeneSetPmcsConnection', nodes: Array<{ __typename?: 'GeneSetPmc', pmcInfoByPmcid?: { __typename?: 'PmcInfo', pmcid: string, title?: string | null } | null }> } }> } } | null> | null } | null } | null };

export type GeneSearchQueryVariables = Exact<{
  genes: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GeneSearchQuery = { __typename?: 'Query', geneSetGeneSearch?: { __typename?: 'GeneSetsConnection', totalCount: number, nodes: Array<{ __typename?: 'GeneSet', term: string }> } | null };

export type TermSearchQueryVariables = Exact<{
  terms: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TermSearchQuery = { __typename?: 'Query', geneSetTermSearch?: { __typename?: 'GeneSetsConnection', totalCount: number, nodes: Array<{ __typename?: 'GeneSet', id: string, term: string, nGeneIds: number }> } | null };

export type AddUserGeneSetMutationVariables = Exact<{
  genes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddUserGeneSetMutation = { __typename?: 'Mutation', addUserGeneSet?: { __typename?: 'AddUserGeneSetPayload', userGeneSet?: { __typename?: 'UserGeneSet', id: string } | null } | null };

export type GetPmcInfoByIdsQueryVariables = Exact<{
  pmcids: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type GetPmcInfoByIdsQuery = { __typename?: 'Query', getPmcInfoByIds?: { __typename?: 'PmcInfosConnection', nodes: Array<{ __typename?: 'PmcInfo', pmcid: string, title?: string | null, yr?: number | null, doi?: string | null }> } | null };

export type TermsPmcsQueryVariables = Exact<{
  pmcids: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type TermsPmcsQuery = { __typename?: 'Query', termsPmcsCount?: { __typename?: 'TermsPmcsCountConnection', nodes: Array<{ __typename?: 'TermsPmcsCountRecord', pmc?: string | null, id?: string | null, term?: string | null, count?: number | null }> } | null };

export type ViewGeneSetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewGeneSetQuery = { __typename?: 'Query', geneSet?: { __typename?: 'GeneSet', genes: { __typename?: 'GenesConnection', nodes: Array<{ __typename?: 'Gene', symbol: string, ncbiGeneId?: number | null, description?: string | null, summary?: string | null }> } } | null };

export type ViewGeneSet2QueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ViewGeneSet2Query = { __typename?: 'Query', geneSet?: { __typename?: 'GeneSet', term: string, description?: string | null, genes: { __typename?: 'GenesConnection', nodes: Array<{ __typename?: 'Gene', symbol: string, ncbiGeneId?: number | null, description?: string | null, summary?: string | null }> } } | null };

export type ViewGeneSet3QueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type ViewGeneSet3Query = { __typename?: 'Query', geneSetByTerm?: { __typename?: 'GeneSet', term: string, description?: string | null, genes: { __typename?: 'GenesConnection', nodes: Array<{ __typename?: 'Gene', symbol: string, ncbiGeneId?: number | null, description?: string | null, summary?: string | null }> } } | null };

export type OverlapQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  genes: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type OverlapQueryQuery = { __typename?: 'Query', geneSet?: { __typename?: 'GeneSet', overlap: { __typename?: 'GenesConnection', nodes: Array<{ __typename?: 'Gene', symbol: string, ncbiGeneId?: number | null, description?: string | null, summary?: string | null }> } } | null };

export type FetchGeneInfoQueryVariables = Exact<{
  genes: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type FetchGeneInfoQuery = { __typename?: 'Query', geneMap2?: { __typename?: 'GeneMappingsConnection', nodes: Array<{ __typename?: 'GeneMapping', gene?: string | null, geneInfo?: { __typename?: 'Gene', symbol: string, ncbiGeneId?: number | null, description?: string | null, summary?: string | null } | null }> } | null };

export type LatestReleaseQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestReleaseQuery = { __typename?: 'Query', allReleases?: { __typename?: 'ReleasesConnection', nodes: Array<{ __typename?: 'Release', created?: string | null }> } | null };


export const StatsDocument = gql`
    query Stats {
  allUserGeneSets {
    totalCount
  }
  allGeneSets {
    totalCount
  }
  allGeneSetPmcs {
    totalCount
  }
  pmcStats {
    nPublicationsProcessed
  }
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export function useStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsSuspenseQueryHookResult = ReturnType<typeof useStatsSuspenseQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const FetchUserGeneSetDocument = gql`
    query FetchUserGeneSet($nodeId: ID!) {
  userGeneSet(nodeId: $nodeId) {
    id
    genes
    description
  }
}
    `;

/**
 * __useFetchUserGeneSetQuery__
 *
 * To run a query within a React component, call `useFetchUserGeneSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserGeneSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserGeneSetQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useFetchUserGeneSetQuery(baseOptions: Apollo.QueryHookOptions<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables> & ({ variables: FetchUserGeneSetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables>(FetchUserGeneSetDocument, options);
      }
export function useFetchUserGeneSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables>(FetchUserGeneSetDocument, options);
        }
export function useFetchUserGeneSetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables>(FetchUserGeneSetDocument, options);
        }
export type FetchUserGeneSetQueryHookResult = ReturnType<typeof useFetchUserGeneSetQuery>;
export type FetchUserGeneSetLazyQueryHookResult = ReturnType<typeof useFetchUserGeneSetLazyQuery>;
export type FetchUserGeneSetSuspenseQueryHookResult = ReturnType<typeof useFetchUserGeneSetSuspenseQuery>;
export type FetchUserGeneSetQueryResult = Apollo.QueryResult<FetchUserGeneSetQuery, FetchUserGeneSetQueryVariables>;
export const EnrichmentQueryDocument = gql`
    query EnrichmentQuery($genes: [String]!, $filterTerm: String = "", $offset: Int = 0, $first: Int = 10) {
  currentBackground {
    enrich(genes: $genes, filterTerm: $filterTerm, offset: $offset, first: $first) {
      nodes {
        geneSetHash
        pvalue
        adjPvalue
        oddsRatio
        nOverlap
        geneSets {
          nodes {
            id
            term
            description
            nGeneIds
            geneSetPmcsById(first: 1) {
              nodes {
                pmcInfoByPmcid {
                  pmcid
                  title
                }
              }
            }
          }
          totalCount
        }
      }
      totalCount
    }
  }
}
    `;

/**
 * __useEnrichmentQueryQuery__
 *
 * To run a query within a React component, call `useEnrichmentQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrichmentQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrichmentQueryQuery({
 *   variables: {
 *      genes: // value for 'genes'
 *      filterTerm: // value for 'filterTerm'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useEnrichmentQueryQuery(baseOptions: Apollo.QueryHookOptions<EnrichmentQueryQuery, EnrichmentQueryQueryVariables> & ({ variables: EnrichmentQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrichmentQueryQuery, EnrichmentQueryQueryVariables>(EnrichmentQueryDocument, options);
      }
export function useEnrichmentQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrichmentQueryQuery, EnrichmentQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrichmentQueryQuery, EnrichmentQueryQueryVariables>(EnrichmentQueryDocument, options);
        }
export function useEnrichmentQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EnrichmentQueryQuery, EnrichmentQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EnrichmentQueryQuery, EnrichmentQueryQueryVariables>(EnrichmentQueryDocument, options);
        }
export type EnrichmentQueryQueryHookResult = ReturnType<typeof useEnrichmentQueryQuery>;
export type EnrichmentQueryLazyQueryHookResult = ReturnType<typeof useEnrichmentQueryLazyQuery>;
export type EnrichmentQuerySuspenseQueryHookResult = ReturnType<typeof useEnrichmentQuerySuspenseQuery>;
export type EnrichmentQueryQueryResult = Apollo.QueryResult<EnrichmentQueryQuery, EnrichmentQueryQueryVariables>;
export const GeneSearchDocument = gql`
    query GeneSearch($genes: [String]!, $offset: Int = 0, $first: Int = 10) {
  geneSetGeneSearch(genes: $genes, offset: $offset, first: $first) {
    nodes {
      term
    }
    totalCount
  }
}
    `;

/**
 * __useGeneSearchQuery__
 *
 * To run a query within a React component, call `useGeneSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneSearchQuery({
 *   variables: {
 *      genes: // value for 'genes'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGeneSearchQuery(baseOptions: Apollo.QueryHookOptions<GeneSearchQuery, GeneSearchQueryVariables> & ({ variables: GeneSearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneSearchQuery, GeneSearchQueryVariables>(GeneSearchDocument, options);
      }
export function useGeneSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneSearchQuery, GeneSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneSearchQuery, GeneSearchQueryVariables>(GeneSearchDocument, options);
        }
export function useGeneSearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GeneSearchQuery, GeneSearchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GeneSearchQuery, GeneSearchQueryVariables>(GeneSearchDocument, options);
        }
export type GeneSearchQueryHookResult = ReturnType<typeof useGeneSearchQuery>;
export type GeneSearchLazyQueryHookResult = ReturnType<typeof useGeneSearchLazyQuery>;
export type GeneSearchSuspenseQueryHookResult = ReturnType<typeof useGeneSearchSuspenseQuery>;
export type GeneSearchQueryResult = Apollo.QueryResult<GeneSearchQuery, GeneSearchQueryVariables>;
export const TermSearchDocument = gql`
    query TermSearch($terms: [String]!, $offset: Int = 0, $first: Int = 10) {
  geneSetTermSearch(terms: $terms, offset: $offset, first: $first) {
    nodes {
      id
      term
      nGeneIds
    }
    totalCount
  }
}
    `;

/**
 * __useTermSearchQuery__
 *
 * To run a query within a React component, call `useTermSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermSearchQuery({
 *   variables: {
 *      terms: // value for 'terms'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useTermSearchQuery(baseOptions: Apollo.QueryHookOptions<TermSearchQuery, TermSearchQueryVariables> & ({ variables: TermSearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermSearchQuery, TermSearchQueryVariables>(TermSearchDocument, options);
      }
export function useTermSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermSearchQuery, TermSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermSearchQuery, TermSearchQueryVariables>(TermSearchDocument, options);
        }
export function useTermSearchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TermSearchQuery, TermSearchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TermSearchQuery, TermSearchQueryVariables>(TermSearchDocument, options);
        }
export type TermSearchQueryHookResult = ReturnType<typeof useTermSearchQuery>;
export type TermSearchLazyQueryHookResult = ReturnType<typeof useTermSearchLazyQuery>;
export type TermSearchSuspenseQueryHookResult = ReturnType<typeof useTermSearchSuspenseQuery>;
export type TermSearchQueryResult = Apollo.QueryResult<TermSearchQuery, TermSearchQueryVariables>;
export const AddUserGeneSetDocument = gql`
    mutation AddUserGeneSet($genes: [String], $description: String = "") {
  addUserGeneSet(input: {genes: $genes, description: $description}) {
    userGeneSet {
      id
    }
  }
}
    `;
export type AddUserGeneSetMutationFn = Apollo.MutationFunction<AddUserGeneSetMutation, AddUserGeneSetMutationVariables>;

/**
 * __useAddUserGeneSetMutation__
 *
 * To run a mutation, you first call `useAddUserGeneSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserGeneSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserGeneSetMutation, { data, loading, error }] = useAddUserGeneSetMutation({
 *   variables: {
 *      genes: // value for 'genes'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddUserGeneSetMutation(baseOptions?: Apollo.MutationHookOptions<AddUserGeneSetMutation, AddUserGeneSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserGeneSetMutation, AddUserGeneSetMutationVariables>(AddUserGeneSetDocument, options);
      }
export type AddUserGeneSetMutationHookResult = ReturnType<typeof useAddUserGeneSetMutation>;
export type AddUserGeneSetMutationResult = Apollo.MutationResult<AddUserGeneSetMutation>;
export type AddUserGeneSetMutationOptions = Apollo.BaseMutationOptions<AddUserGeneSetMutation, AddUserGeneSetMutationVariables>;
export const GetPmcInfoByIdsDocument = gql`
    query GetPmcInfoByIds($pmcids: [String]!) {
  getPmcInfoByIds(pmcids: $pmcids) {
    nodes {
      pmcid
      title
      yr
      doi
    }
  }
}
    `;

/**
 * __useGetPmcInfoByIdsQuery__
 *
 * To run a query within a React component, call `useGetPmcInfoByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPmcInfoByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPmcInfoByIdsQuery({
 *   variables: {
 *      pmcids: // value for 'pmcids'
 *   },
 * });
 */
export function useGetPmcInfoByIdsQuery(baseOptions: Apollo.QueryHookOptions<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables> & ({ variables: GetPmcInfoByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables>(GetPmcInfoByIdsDocument, options);
      }
export function useGetPmcInfoByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables>(GetPmcInfoByIdsDocument, options);
        }
export function useGetPmcInfoByIdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables>(GetPmcInfoByIdsDocument, options);
        }
export type GetPmcInfoByIdsQueryHookResult = ReturnType<typeof useGetPmcInfoByIdsQuery>;
export type GetPmcInfoByIdsLazyQueryHookResult = ReturnType<typeof useGetPmcInfoByIdsLazyQuery>;
export type GetPmcInfoByIdsSuspenseQueryHookResult = ReturnType<typeof useGetPmcInfoByIdsSuspenseQuery>;
export type GetPmcInfoByIdsQueryResult = Apollo.QueryResult<GetPmcInfoByIdsQuery, GetPmcInfoByIdsQueryVariables>;
export const TermsPmcsDocument = gql`
    query TermsPmcs($pmcids: [String]!) {
  termsPmcsCount(pmcids: $pmcids) {
    nodes {
      pmc
      id
      term
      count
    }
  }
}
    `;

/**
 * __useTermsPmcsQuery__
 *
 * To run a query within a React component, call `useTermsPmcsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermsPmcsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermsPmcsQuery({
 *   variables: {
 *      pmcids: // value for 'pmcids'
 *   },
 * });
 */
export function useTermsPmcsQuery(baseOptions: Apollo.QueryHookOptions<TermsPmcsQuery, TermsPmcsQueryVariables> & ({ variables: TermsPmcsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermsPmcsQuery, TermsPmcsQueryVariables>(TermsPmcsDocument, options);
      }
export function useTermsPmcsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermsPmcsQuery, TermsPmcsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermsPmcsQuery, TermsPmcsQueryVariables>(TermsPmcsDocument, options);
        }
export function useTermsPmcsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TermsPmcsQuery, TermsPmcsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TermsPmcsQuery, TermsPmcsQueryVariables>(TermsPmcsDocument, options);
        }
export type TermsPmcsQueryHookResult = ReturnType<typeof useTermsPmcsQuery>;
export type TermsPmcsLazyQueryHookResult = ReturnType<typeof useTermsPmcsLazyQuery>;
export type TermsPmcsSuspenseQueryHookResult = ReturnType<typeof useTermsPmcsSuspenseQuery>;
export type TermsPmcsQueryResult = Apollo.QueryResult<TermsPmcsQuery, TermsPmcsQueryVariables>;
export const ViewGeneSetDocument = gql`
    query ViewGeneSet($id: ID!) {
  geneSet(nodeId: $id) {
    genes {
      nodes {
        symbol
        ncbiGeneId
        description
        summary
      }
    }
  }
}
    `;

/**
 * __useViewGeneSetQuery__
 *
 * To run a query within a React component, call `useViewGeneSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewGeneSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewGeneSetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useViewGeneSetQuery(baseOptions: Apollo.QueryHookOptions<ViewGeneSetQuery, ViewGeneSetQueryVariables> & ({ variables: ViewGeneSetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewGeneSetQuery, ViewGeneSetQueryVariables>(ViewGeneSetDocument, options);
      }
export function useViewGeneSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewGeneSetQuery, ViewGeneSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewGeneSetQuery, ViewGeneSetQueryVariables>(ViewGeneSetDocument, options);
        }
export function useViewGeneSetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewGeneSetQuery, ViewGeneSetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewGeneSetQuery, ViewGeneSetQueryVariables>(ViewGeneSetDocument, options);
        }
export type ViewGeneSetQueryHookResult = ReturnType<typeof useViewGeneSetQuery>;
export type ViewGeneSetLazyQueryHookResult = ReturnType<typeof useViewGeneSetLazyQuery>;
export type ViewGeneSetSuspenseQueryHookResult = ReturnType<typeof useViewGeneSetSuspenseQuery>;
export type ViewGeneSetQueryResult = Apollo.QueryResult<ViewGeneSetQuery, ViewGeneSetQueryVariables>;
export const ViewGeneSet2Document = gql`
    query ViewGeneSet2($id: ID!) {
  geneSet(nodeId: $id) {
    term
    description
    genes {
      nodes {
        symbol
        ncbiGeneId
        description
        summary
      }
    }
  }
}
    `;

/**
 * __useViewGeneSet2Query__
 *
 * To run a query within a React component, call `useViewGeneSet2Query` and pass it any options that fit your needs.
 * When your component renders, `useViewGeneSet2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewGeneSet2Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useViewGeneSet2Query(baseOptions: Apollo.QueryHookOptions<ViewGeneSet2Query, ViewGeneSet2QueryVariables> & ({ variables: ViewGeneSet2QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewGeneSet2Query, ViewGeneSet2QueryVariables>(ViewGeneSet2Document, options);
      }
export function useViewGeneSet2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewGeneSet2Query, ViewGeneSet2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewGeneSet2Query, ViewGeneSet2QueryVariables>(ViewGeneSet2Document, options);
        }
export function useViewGeneSet2SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewGeneSet2Query, ViewGeneSet2QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewGeneSet2Query, ViewGeneSet2QueryVariables>(ViewGeneSet2Document, options);
        }
export type ViewGeneSet2QueryHookResult = ReturnType<typeof useViewGeneSet2Query>;
export type ViewGeneSet2LazyQueryHookResult = ReturnType<typeof useViewGeneSet2LazyQuery>;
export type ViewGeneSet2SuspenseQueryHookResult = ReturnType<typeof useViewGeneSet2SuspenseQuery>;
export type ViewGeneSet2QueryResult = Apollo.QueryResult<ViewGeneSet2Query, ViewGeneSet2QueryVariables>;
export const ViewGeneSet3Document = gql`
    query ViewGeneSet3($term: String!) {
  geneSetByTerm(term: $term) {
    term
    description
    genes {
      nodes {
        symbol
        ncbiGeneId
        description
        summary
      }
    }
  }
}
    `;

/**
 * __useViewGeneSet3Query__
 *
 * To run a query within a React component, call `useViewGeneSet3Query` and pass it any options that fit your needs.
 * When your component renders, `useViewGeneSet3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewGeneSet3Query({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useViewGeneSet3Query(baseOptions: Apollo.QueryHookOptions<ViewGeneSet3Query, ViewGeneSet3QueryVariables> & ({ variables: ViewGeneSet3QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewGeneSet3Query, ViewGeneSet3QueryVariables>(ViewGeneSet3Document, options);
      }
export function useViewGeneSet3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewGeneSet3Query, ViewGeneSet3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewGeneSet3Query, ViewGeneSet3QueryVariables>(ViewGeneSet3Document, options);
        }
export function useViewGeneSet3SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ViewGeneSet3Query, ViewGeneSet3QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ViewGeneSet3Query, ViewGeneSet3QueryVariables>(ViewGeneSet3Document, options);
        }
export type ViewGeneSet3QueryHookResult = ReturnType<typeof useViewGeneSet3Query>;
export type ViewGeneSet3LazyQueryHookResult = ReturnType<typeof useViewGeneSet3LazyQuery>;
export type ViewGeneSet3SuspenseQueryHookResult = ReturnType<typeof useViewGeneSet3SuspenseQuery>;
export type ViewGeneSet3QueryResult = Apollo.QueryResult<ViewGeneSet3Query, ViewGeneSet3QueryVariables>;
export const OverlapQueryDocument = gql`
    query OverlapQuery($id: ID!, $genes: [String]!) {
  geneSet(nodeId: $id) {
    overlap(genes: $genes) {
      nodes {
        symbol
        ncbiGeneId
        description
        summary
      }
    }
  }
}
    `;

/**
 * __useOverlapQueryQuery__
 *
 * To run a query within a React component, call `useOverlapQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverlapQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverlapQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *      genes: // value for 'genes'
 *   },
 * });
 */
export function useOverlapQueryQuery(baseOptions: Apollo.QueryHookOptions<OverlapQueryQuery, OverlapQueryQueryVariables> & ({ variables: OverlapQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OverlapQueryQuery, OverlapQueryQueryVariables>(OverlapQueryDocument, options);
      }
export function useOverlapQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OverlapQueryQuery, OverlapQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OverlapQueryQuery, OverlapQueryQueryVariables>(OverlapQueryDocument, options);
        }
export function useOverlapQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OverlapQueryQuery, OverlapQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OverlapQueryQuery, OverlapQueryQueryVariables>(OverlapQueryDocument, options);
        }
export type OverlapQueryQueryHookResult = ReturnType<typeof useOverlapQueryQuery>;
export type OverlapQueryLazyQueryHookResult = ReturnType<typeof useOverlapQueryLazyQuery>;
export type OverlapQuerySuspenseQueryHookResult = ReturnType<typeof useOverlapQuerySuspenseQuery>;
export type OverlapQueryQueryResult = Apollo.QueryResult<OverlapQueryQuery, OverlapQueryQueryVariables>;
export const FetchGeneInfoDocument = gql`
    query FetchGeneInfo($genes: [String]!) {
  geneMap2(genes: $genes) {
    nodes {
      gene
      geneInfo {
        symbol
        ncbiGeneId
        description
        summary
      }
    }
  }
}
    `;

/**
 * __useFetchGeneInfoQuery__
 *
 * To run a query within a React component, call `useFetchGeneInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGeneInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGeneInfoQuery({
 *   variables: {
 *      genes: // value for 'genes'
 *   },
 * });
 */
export function useFetchGeneInfoQuery(baseOptions: Apollo.QueryHookOptions<FetchGeneInfoQuery, FetchGeneInfoQueryVariables> & ({ variables: FetchGeneInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchGeneInfoQuery, FetchGeneInfoQueryVariables>(FetchGeneInfoDocument, options);
      }
export function useFetchGeneInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchGeneInfoQuery, FetchGeneInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchGeneInfoQuery, FetchGeneInfoQueryVariables>(FetchGeneInfoDocument, options);
        }
export function useFetchGeneInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchGeneInfoQuery, FetchGeneInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchGeneInfoQuery, FetchGeneInfoQueryVariables>(FetchGeneInfoDocument, options);
        }
export type FetchGeneInfoQueryHookResult = ReturnType<typeof useFetchGeneInfoQuery>;
export type FetchGeneInfoLazyQueryHookResult = ReturnType<typeof useFetchGeneInfoLazyQuery>;
export type FetchGeneInfoSuspenseQueryHookResult = ReturnType<typeof useFetchGeneInfoSuspenseQuery>;
export type FetchGeneInfoQueryResult = Apollo.QueryResult<FetchGeneInfoQuery, FetchGeneInfoQueryVariables>;
export const LatestReleaseDocument = gql`
    query LatestRelease {
  allReleases(orderBy: CREATED_DESC, first: 1) {
    nodes {
      created
    }
  }
}
    `;

/**
 * __useLatestReleaseQuery__
 *
 * To run a query within a React component, call `useLatestReleaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestReleaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestReleaseQuery({
 *   variables: {
 *   },
 * });
 */
export function useLatestReleaseQuery(baseOptions?: Apollo.QueryHookOptions<LatestReleaseQuery, LatestReleaseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestReleaseQuery, LatestReleaseQueryVariables>(LatestReleaseDocument, options);
      }
export function useLatestReleaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestReleaseQuery, LatestReleaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestReleaseQuery, LatestReleaseQueryVariables>(LatestReleaseDocument, options);
        }
export function useLatestReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LatestReleaseQuery, LatestReleaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LatestReleaseQuery, LatestReleaseQueryVariables>(LatestReleaseDocument, options);
        }
export type LatestReleaseQueryHookResult = ReturnType<typeof useLatestReleaseQuery>;
export type LatestReleaseLazyQueryHookResult = ReturnType<typeof useLatestReleaseLazyQuery>;
export type LatestReleaseSuspenseQueryHookResult = ReturnType<typeof useLatestReleaseSuspenseQuery>;
export type LatestReleaseQueryResult = Apollo.QueryResult<LatestReleaseQuery, LatestReleaseQueryVariables>;