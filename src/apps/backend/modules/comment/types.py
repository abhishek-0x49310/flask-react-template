from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from modules.application.common.types import PaginationParams, PaginationResult, SortParams


@dataclass(frozen=True)
class Comment:
    id: str
    task_id: str
    author_id: str
    text: str


@dataclass(frozen=True)
class GetCommentParams:
    author_id: str
    task_id: str
    comment_id: str


@dataclass(frozen=True)
class GetPaginatedCommentsParams:
    author_id: str
    task_id: str
    pagination_params: PaginationParams
    sort_params: Optional[SortParams] = None


@dataclass(frozen=True)
class CreateCommentParams:
    author_id: str
    task_id: str
    text: str


@dataclass(frozen=True)
class UpdateCommentParams:
    author_id: str
    task_id: str
    comment_id: str
    text: str


@dataclass(frozen=True)
class DeleteCommentParams:
    author_id: str
    task_id: str
    comment_id: str


@dataclass(frozen=True)
class CommentDeletionResult:
    comment_id: str
    deleted_at: datetime
    success: bool


@dataclass(frozen=True)
class CommentErrorCode:
    NOT_FOUND: str = "COMMENT_ERR_01"
    BAD_REQUEST: str = "COMMENT_ERR_02"