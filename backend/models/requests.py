from enum import Enum
from sqlmodel import Field, SQLModel
from datetime import datetime
from pydantic import EmailStr
import uuid


# Field related stuff, putting it here to make it easy to find
PURPOSE_QUESTIONS: dict[str, dict[str, str]] = {
    "academic": {
        "unique_assignment_experience": "Describe a specific assignment, project, or research experience where you did your best work. What made it stand out?",
        "intellectual_curiosity": "Describe a time you went beyond what was required in a class — extra reading, a follow-up question, a self-started project.",
        "growth_through_struggle": "Describe an academic challenge you faced and how you worked through it.",
    },
    "job": {
        "leadership_example": "Describe a time you led a team or took initiative on a project without being asked.",
        "conflict_resolution": "Describe a disagreement or conflict at work and how you helped resolve it.",
        "measurable_impact": "Describe a specific result you achieved that you can point to concretely (a number, an outcome, a change you caused).",
    },
    "scholarship": {
        "financial_or_personal_context": "Is there context about your background or circumstances that shaped your path that you'd want a recommender to know about?",
        "community_impact": "Describe something you did to help your community, school, or a group you're part of.",
        "long_term_goal": "What are you hoping this opportunity leads to, and why does it matter to you?",
    },
    "general": {
        "defining_moment": "Describe a moment that best represents who you are.",
        "strength_with_example": "What's a strength of yours, and what's a specific example that proves it?",
    },
}


class BragProfileBase(SQLModel):
    '''for requests endpoints'''
    bio: str | None 
    proudest_achievement: str | None 
    leadership_example: str | None 
    challenge_overcome: str | None


class BragProfile(BragProfileBase, table=True): 
    '''The user profile for their brag sheet'''
    __tablename__ = "brag_profiles"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", unique=True, index=True)

    # we have to find a way to make this more freeform, maybe make the user define their own questions?
    bio: str | None = Field(default=None)
    proudest_achievement: str | None = Field(default=None)
    leadership_example: str | None = Field(default=None)
    challenge_overcome: str | None = Field(default=None)

class RecommendationType(str, Enum): 
    '''The type of recommendation'''
    job = "work"
    academic = "academic"
    scholarship = "scholarship"
    general = "general"

class RequestStatus(str, Enum): 
    '''The status of the recommender's draft'''
    pending = "pending"
    drafting = "drafting"
    submitted = "submitted"

class RecommendationRequestBase(SQLModel): 
    '''Base class for all recommendation requests'''
    purpose: RecommendationType 
    recommender_name: str 
    recommender_email: EmailStr 
    field_questions_json: str


class RecommendationRequest(RecommendationRequestBase, table=True): 
    '''Per recommender request (the main object)'''
    __tablename__ = "requests"
    # unique id
    id: int | None = Field(default=None, primary_key=True)
    status: RequestStatus = Field(
        default=RequestStatus.pending, 
        description="Must be RequestStatus"
    )
    # foreign key connects this to the user who made the request
    user_id: int = Field(foreign_key="users.id", index=True)
    # purpose of the rec letter 
    # SUPERCLASS stuff
    purpose: RecommendationType = Field(
        default=RecommendationType.general, 
        description="Must be either work, academic, scholarship, or general" # meta data for fastapi
    )
    # recommender details 
    recommender_name: str = Field() 
    recommender_email: str = Field()
    # specific to the recommendation type
    field_questions_json: str = Field()

    access_token: str = Field(default_factory=lambda: uuid.uuid4().hex, unique=True)
    # auto generate the time of the request
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)